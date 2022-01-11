import { useCallback, useRef, useState } from "react";
import { useDropzone } from "react-dropzone";

const Submission = () => {
  const { getRootProps, getInputProps, isDragActive } = useDropzone();
  const formRef = useRef<HTMLFormElement>(null);

  const file = formRef?.current?.["file"].value;

  return (
    <div className="rounded-md shadow-sm p-4 my-4 bg-white">
      <div className="py-6">
        <h2 className="text-4xl font-bold text-[#1174af]">Submission</h2>
      </div>
      <hr />
      <div className="py-2">
        <div className="md:grid md:grid-cols-3 md:gap-6">
          <div className="md:col-span-1">
            <div className="px-4 sm:px-0">
              <h3 className="text-lg font-medium leading-6 text-gray-900">
                Make a submission
              </h3>
              <div className="py-4">
                <p className="text-xs font-bold text-slate-500">File Format</p>
                <p className="text-sm">
                  Your submission should be in CSV format
                </p>
              </div>
            </div>
          </div>
          <div className="mt-5 md:mt-0 md:col-span-2">
            <form
              autoComplete="off"
              onSubmit={(e: React.FormEvent<HTMLFormElement>) => {
                e.preventDefault();
                const form = e.currentTarget;
              }}
              ref={formRef}
            >
              <div className="shadow sm:rounded-md sm:overflow-hidden">
                <div className="px-4 py-5 bg-white space-y-6 sm:p-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Submission File
                    </label>
                    <div
                      className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md cursor-pointer"
                      {...getRootProps()}
                    >
                      <div className="space-y-1 text-center">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          fill="currentColor"
                          className="bi bi-file-earmark-spreadsheet mx-auto h-12 w-12 text-gray-500"
                          viewBox="0 0 16 16"
                        >
                          <path d="M14 14V4.5L9.5 0H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2zM9.5 3A1.5 1.5 0 0 0 11 4.5h2V9H3V2a1 1 0 0 1 1-1h5.5v2zM3 12v-2h2v2H3zm0 1h2v2H4a1 1 0 0 1-1-1v-1zm3 2v-2h3v2H6zm4 0v-2h3v1a1 1 0 0 1-1 1h-2zm3-3h-3v-2h3v2zm-7 0v-2h3v2H6z" />
                        </svg>
                        <div className="text-sm text-gray-600">
                          <div className="">
                            <input
                              id="file-upload"
                              name="file"
                              type="file"
                              className=""
                              {...getInputProps()}
                            />
                            {isDragActive ? (
                              <p>Drop the file</p>
                            ) : (
                              <p>
                                Drag 'n' drop some file here, or click to select
                                file
                              </p>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                    <p className="font-bold text-sm text-center">
                      {file ? "Current file: " + file : "No file choosen"}
                    </p>
                  </div>
                </div>
                <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
                  <button type="submit" className="btn bg-[#1174af] text-white">
                    Make Submission
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Submission;
