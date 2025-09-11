import React from "react";
import Sort from "@/components/Sort";
import { getFiles } from "@/lib/actions/files.actions";
import { Models } from "node-appwrite";
import Card from "@/components/Card";
import { getFileTypesParams, convertFileSize } from "@/lib/utils";
import { getTotalSpaceUsed } from "@/lib/actions/files.actions";

const Page = async ({ searchParams, params }: SearchParamProps) => {
  const type = ((await params)?.type as string) || "";
  const searchText = ((await searchParams)?.query as string) || "";
  const sort = ((await searchParams)?.sort as string) || "";

  const types = getFileTypesParams(type) as FileType[];

  const files = await getFiles({ types, searchText, sort });

  const totalSpace = await getTotalSpaceUsed();
  let totalForType = 0;
  switch (type) {
    case "documents":
      totalForType = totalSpace?.document?.size || 0;
      break;
    case "images":
      totalForType = totalSpace?.image?.size || 0;
      break;
    case "media":
      totalForType = (totalSpace?.video?.size || 0) + (totalSpace?.audio?.size || 0);
      break;
    case "others":
      totalForType = totalSpace?.other?.size || 0;
      break;
    default:
      totalForType = 0;
  }

  return (
    <div className="page-container">
      <section className="w-full">
        <h1 className="h1 capitalize">{type}</h1>

        <div className="total-size-section">
          <p className="body-1">
            Total: <span className="h5">{convertFileSize(totalForType)}</span>
          </p>

          <div className="sort-container">
            <p className="body-1 hidden text-light-200 sm:block">Sort by:</p>

            <Sort />
          </div>
        </div>
      </section>

      {/* Render the files */}
      {files.total > 0 ? (
        <section className="file-list">
          {files.documents.map((file: Models.Document) => (
            <Card key={file.$id} file={file} />
          ))}
        </section>
      ) : (
        <p className="empty-list">No files uploaded</p>
      )}
    </div>
  );
};

export default Page;
