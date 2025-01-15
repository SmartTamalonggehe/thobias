import PaginationDefault from "@/Components/pagination/PaginationDefault";
import TablesDefault from "@/Components/tables/TablesDefault";
import PaginateTypes from "@/types/Paginate";
import SubDistrictsTypes from "@/types/SubDistricts";
import { useState } from "react";

type Props = {
    data: PaginateTypes<SubDistrictsTypes[]>;
};

const ShowData = ({ data }: Props) => {
    console.log({ data });
    // state
    const [page, setPage] = useState<number>(1);
    const [limit, setLimit] = useState<number>(10);
    // table
    const headTable = ["No", "Nama", "Aksi"];
    const tableBodies = ["sub_district_nm"];
    return (
        <div className="flex-1 flex-col max-w-full h-full overflow-auto">
            <>
                <div className="">
                    <TablesDefault
                        headTable={headTable}
                        tableBodies={tableBodies}
                        dataTable={data?.data}
                        page={page}
                        limit={limit}
                        ubah={true}
                        hapus={true}
                    />
                </div>
                {data?.last_page > 1 && (
                    <div className="mt-4">
                        <PaginationDefault
                            currentPage={data?.current_page}
                            totalPages={data?.last_page}
                            setPage={setPage}
                        />
                    </div>
                )}
            </>
        </div>
    );
};

export default ShowData;
