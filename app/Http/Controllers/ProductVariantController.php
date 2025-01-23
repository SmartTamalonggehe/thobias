<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\ProductVariant;
use Illuminate\Support\Facades\DB;
use App\Http\Resources\CrudResource;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Validator;
use App\Http\Controllers\TOOLS\ImgToolsController;

class ProductVariantController extends Controller
{
    protected $imgController;
    // make construct
    public function __construct()
    {
        // memanggil controller image
        $this->imgController = new ImgToolsController();
    }
    // sparta validation
    protected function spartaValidation($request, $id = "")
    {
        $required = "";
        if ($id == "") {
            $required = "required";
        }
        $rules = [
            'product_id' => 'required',
        ];

        $messages = [
            'product_id.required' => 'Nama ProductVariant harus diisi.',
        ];

        $validator = Validator::make($request, $rules, $messages);

        if ($validator->fails()) {
            $message = [
                'judul' => 'Gagal',
                'type' => 'error',
                'message' => $validator->errors()->first(),
            ];
            return response()->json($message, 400);
        }

        // Cek kombinasi unik hanya jika color dan size diisi
        if (!empty($request['color']) && !empty($request['size'])) {
            $exists = DB::table('product_variants')
                ->where('product_id', $request['product_id'])
                ->where('color', $request['color'])
                ->where('size', $request['size'])
                ->when($id, function ($query) use ($id) {
                    return $query->where('id', '!=', $id);
                })
                ->exists();

            if ($exists) {
                return response()->json([
                    'judul' => 'Gagal',
                    'type' => 'error',
                    'message' => 'Kombinasi warna dan ukuran sudah ada untuk produk ini.'
                ], 400);
            }
        }
    }
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $search = $request->search;
        $sortby = $request->sortby;
        $order = $request->order;
        $product_id = $request->product_id;
        $data = ProductVariant::with('product')
            ->where(function ($query) use ($search) {
                $query->where('product_id', 'like', "%$search%");
            })
            ->where(function ($query) use ($product_id) {
                $query->where('product_id', $product_id);
            })
            ->orderBy($sortby ?? 'created_at', $order ?? 'desc')
            ->paginate(10);
        return new CrudResource('success', 'Data ProductVariant', $data);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $data_req = $request->all();
        // return $data_req;
        $validate = $this->spartaValidation($data_req);
        if ($validate) {
            return $validate;
        }
        DB::beginTransaction();
        try {
            // export foto
            if ($request->hasFile('variant_img')) {

                $variant_img = $this->imgController->addImage('variant_img', $data_req['variant_img']);
                // jika foto gagal di upload
                if (!$variant_img) {
                    DB::rollback();
                    return new CrudResource('error', 'Gagal Upload Foto', null);
                }
                $data_req['variant_img'] = "storage/$variant_img";
            }
            ProductVariant::create($data_req);
            $data = ProductVariant::with('product')
                ->latest()->first();
            DB::commit();
            return new CrudResource('success', 'Data Berhasil Disimpan', $data);
        } catch (\Throwable $th) {
            // jika terdapat kesalahan
            DB::rollback();
            $message = [
                'judul' => 'Gagal',
                'type' => 'error',
                'message' => $th->getMessage(),
            ];
            return response()->json($message, 400);
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $data = ProductVariant::with('product')
            ->find($id);
        return new CrudResource('success', 'Data ProductVariant', $data);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $data_req = $request->all();
        // return $data_req;
        $validate = $this->spartaValidation($data_req, $id);
        if ($validate) {
            return $validate;
        }
        // unset method
        unset($data_req['_method']);
        DB::beginTransaction();
        try {
            $data = ProductVariant::findOrFail($id);
            // find file variant_img
            $variant_img = $data->variant_img;
            // export variant_img
            if ($request->hasFile('variant_img')) {
                // remove file variant_img jika ada
                if ($variant_img) {
                    File::delete($variant_img);
                }
                $variant_img = $this->imgController->addImage('variant_img', $data_req['variant_img']);
                if (!$variant_img) {
                    return new CrudResource('error', 'Gagal Upload Variant_img', null);
                }
                $data_req['variant_img'] = "storage/$variant_img";
            } else {
                $data_req['variant_img'] = $variant_img;
            }
            // update data
            ProductVariant::find($id)->update($data_req);

            $data = ProductVariant::with('product')
                ->find($id);
            DB::commit();
            return new CrudResource('success', 'Data Berhasil Diubah', $data);
        } catch (\Throwable $th) {
            // jika terdapat kesalahan
            DB::rollback();
            $message = [
                'judul' => 'Gagal',
                'type' => 'error',
                'message' => $th->getMessage(),
            ];
            return response()->json($message, 400);
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        // delete data productVariant
        $data = ProductVariant::findOrFail($id);
        // get foto productVariant
        $variant_img = $data->variant_img;
        // remove variant_img
        if ($variant_img) {
            File::delete($variant_img);
        }
        // delete data
        $data->delete();

        return new CrudResource('success', 'Data Berhasil Dihapus', $data);
    }
}
