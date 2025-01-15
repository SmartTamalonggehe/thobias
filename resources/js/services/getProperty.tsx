/**
 * eslint-disable @typescript-eslint/no-unused-vars
 *
 * @format
 */

/* eslint-disable @typescript-eslint/no-explicit-any */
/** @format */

import { BASE_URL } from "./baseURL";
import moment from "moment";
import DOMPurify from "dompurify";
import showRupiah from "./rupiah";

const getYouTubeVideoId = (url: string) => {
    const regExp =
        /^.*(youtu\.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
    const match = url.match(regExp);
    return match && match[2].length === 11 ? match[2] : null;
};

const getProperty = (obj: any, prop: any, index: number, setIndexBox: any) => {
    const parts = prop.split(".");
    if (Array.isArray(parts)) {
        const last = parts.length > 1 ? parts.pop() : parts;
        // jika gabungan antara pangkat golongan dan ruang
        if (last.includes("start_end")) {
            const start_time = moment(obj["start_time"], "HH:mm:ss").format(
                "HH:mm"
            );
            const end_time = moment(obj["end_time"], "HH:mm:ss").format(
                "HH:mm"
            );
            return `${start_time} - ${end_time}`;
        }
        if (last.includes("user_user_info_nm_user")) {
            const userInfo = obj["user"]["user_info"][0]["nm_user"];
            return userInfo;
        }
        // memisahkan properti dalam bentuk array
        const l = parts.length;
        let i = 1,
            current = parts[0];
        while ((obj = obj[current]) && i < l) {
            current = parts[i];
            i++;
        }
        if (typeof obj === "object") {
            return obj ? obj[last] : "";
        }
        // date pros
        const dateProps = ["start_date", "end_date"];
        // cek date
        if (dateProps.includes(prop)) {
            return moment(obj).format("DD/MM/YYYY");
        }
        // check currecy
        // date pros
        const currencyProps = ["shipping_cost", "price"];
        // cek date
        if (currencyProps.includes(prop)) {
            return showRupiah(obj);
        }
        // cek image
        const fileProps = ["product_img", "foto"];
        // cek image
        if (fileProps.includes(prop)) {
            const extension = obj.split(".").pop();
            return (
                obj &&
                (["png", "jpg", "jpeg"].includes(extension) ? (
                    <img
                        src={`${BASE_URL}/${obj}`}
                        loading="lazy"
                        width={70}
                        height={70}
                        alt=""
                        className="cursor-pointer"
                        onClick={
                            setIndexBox ? () => setIndexBox(index) : undefined
                        }
                    />
                ) : (
                    <a
                        href={`${BASE_URL}/${obj}`}
                        target="_blank"
                        rel="noreferrer"
                        className="text-blue-700"
                    >
                        Lihat File
                    </a>
                ))
            );
        }
        // cek content
        const ContentProps = ["content"];
        // fungsi untuk membatasi jumlah karakter
        const limitContentLength = (content: string, maxLength: number) => {
            if (content.length > maxLength) {
                return content.slice(0, maxLength) + "..."; // tambahkan "..." jika konten terlalu panjang
            }
            return content;
        };

        if (ContentProps.includes(prop)) {
            // batasi konten hingga 200 karakter sebelum melakukan sanitasi
            const limitedContent = limitContentLength(obj, 200);
            const cleanContent = DOMPurify.sanitize(limitedContent);

            return (
                <div
                    className="prose"
                    dangerouslySetInnerHTML={{ __html: cleanContent }}
                />
            );
        }

        // cek youtube_url
        const YoutubUrl = ["youtube_url"];
        if (YoutubUrl.includes(prop)) {
            return (
                <a href={obj} target="_blank" rel="noopener noreferrer">
                    <img
                        src={`https://img.youtube.com/vi/${getYouTubeVideoId(
                            obj
                        )}/0.jpg`}
                        loading="lazy"
                        width={70}
                        height={70}
                        alt=""
                        className="cursor-pointer"
                    />
                </a>
            );
        }
        return <p className="capitalize">{obj}</p>;
    } else {
        // eslint-disable-next-line no-throw-literal
        throw "parts is not valid array";
    }
};

export default getProperty;
