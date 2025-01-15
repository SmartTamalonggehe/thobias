/**
 * eslint-disable @typescript-eslint/no-unused-vars
 *
 * @format
 */

/* eslint-disable @typescript-eslint/no-explicit-any */
/** @format */

import { FC } from "react";
import { BsChevronRight, BsChevronLeft } from "react-icons/bs";

type Props = {
  totalPages: number;
  currentPage: number;
  setPage: (page: number) => void;
};

const PaginationDefault: FC<Props> = ({ totalPages, currentPage, setPage }) => {
  let pages: any = [];

  if (totalPages <= 5) {
    pages = Array.from({ length: totalPages }, (_, i) => i + 1);
  } else {
    pages = [1, currentPage - 1, currentPage, currentPage + 1, totalPages];
    pages = Array.from(new Set(pages)).sort((a: any, b: any) => a - b);
    pages = pages.filter((page: number) => page > 0 && page <= totalPages);

    for (let i = 1; i < pages.length - 1; i++) {
      if (pages[i] - pages[i - 1] > 1) {
        pages.splice(i, 0, "...");
        i++;
      }
    }

    if (totalPages - pages[pages.length - 2] > 1) {
      pages.splice(pages.length - 1, 0, "...");
    }
  }

  return (
    <div className="h-full">
      <ol className="flex justify-center gap-1 text-xs font-medium">
        {currentPage > 1 && (
          <li>
            <div
              onClick={() => setPage(currentPage - 1)}
              className="cursor-pointer inline-flex h-8 w-8 items-center justify-center rounded border border-gray-100"
            >
              <BsChevronLeft />
            </div>
          </li>
        )}
        {/* pages */}
        {pages.map((page: any, index: any) =>
          page === "..." ? (
            <li key={index} className="flex items-end text-xl">
              <div
                className={`block h-8 w-8 rounded border border-gray-100 text-center leading-8`}
              >
                {page}
              </div>
            </li>
          ) : (
            <li key={index}>
              <div
                onClick={() => setPage(page)}
                className={`cursor-pointer block h-8 w-8 rounded border border-gray-100 text-center leading-8 ${
                  page == currentPage ? "bg-blue-900 text-white" : ""
                }`}
              >
                {page}
              </div>
            </li>
          )
        )}

        {currentPage < totalPages && (
          <li>
            <div
              onClick={() => setPage(currentPage + 1)}
              className="cursor-pointer inline-flex h-8 w-8 items-center justify-center rounded border border-gray-100"
            >
              <BsChevronRight />
            </div>
          </li>
        )}
      </ol>
    </div>
  );
};

export default PaginationDefault;
