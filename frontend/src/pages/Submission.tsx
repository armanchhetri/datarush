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
                AI competiton submission
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
                  <div className="grid grid-cols-6 gap-6">
                    <div className="col-span-6 ">
                      <label
                        htmlFor="team-token"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Team Token
                      </label>
                      <input
                        type="text"
                        name="team-token"
                        id="team-token"
                        autoComplete="given-name"
                        className="mt-1 focus:ring-[#1174af]-500 focus:border-[#1174af]-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                      />
                    </div>
                  </div>

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

          <div className="md:col-span-1">
            <div className="px-4 sm:px-0">
              <h3 className="text-lg font-medium leading-6 text-gray-900">
                Data Insights Report
              </h3>
              <div className="py-4">
                <p className="text-xs font-bold text-slate-500">File Format</p>
                <p className="text-sm">
                  Your submission should be in PDF format
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
                  <div className="grid grid-cols-6 gap-6">
                    <div className="col-span-6 ">
                      <label
                        htmlFor="team-token"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Team Token
                      </label>
                      <input
                        type="text"
                        name="team-token"
                        id="team-token"
                        autoComplete="given-name"
                        className="mt-1 focus:ring-[#1174af]-500 focus:border-[#1174af]-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                      />
                    </div>
                  </div>
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
                          <path d="M14 14V4.5L9.5 0H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2zM9.5 3A1.5 1.5 0 0 0 11 4.5h2V14a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h5.5v2z" />
                          <path d="M4.603 14.087a.81.81 0 0 1-.438-.42c-.195-.388-.13-.776.08-1.102.198-.307.526-.568.897-.787a7.68 7.68 0 0 1 1.482-.645 19.697 19.697 0 0 0 1.062-2.227 7.269 7.269 0 0 1-.43-1.295c-.086-.4-.119-.796-.046-1.136.075-.354.274-.672.65-.823.192-.077.4-.12.602-.077a.7.7 0 0 1 .477.365c.088.164.12.356.127.538.007.188-.012.396-.047.614-.084.51-.27 1.134-.52 1.794a10.954 10.954 0 0 0 .98 1.686 5.753 5.753 0 0 1 1.334.05c.364.066.734.195.96.465.12.144.193.32.2.518.007.192-.047.382-.138.563a1.04 1.04 0 0 1-.354.416.856.856 0 0 1-.51.138c-.331-.014-.654-.196-.933-.417a5.712 5.712 0 0 1-.911-.95 11.651 11.651 0 0 0-1.997.406 11.307 11.307 0 0 1-1.02 1.51c-.292.35-.609.656-.927.787a.793.793 0 0 1-.58.029zm1.379-1.901c-.166.076-.32.156-.459.238-.328.194-.541.383-.647.547-.094.145-.096.25-.04.361.01.022.02.036.026.044a.266.266 0 0 0 .035-.012c.137-.056.355-.235.635-.572a8.18 8.18 0 0 0 .45-.606zm1.64-1.33a12.71 12.71 0 0 1 1.01-.193 11.744 11.744 0 0 1-.51-.858 20.801 20.801 0 0 1-.5 1.05zm2.446.45c.15.163.296.3.435.41.24.19.407.253.498.256a.107.107 0 0 0 .07-.015.307.307 0 0 0 .094-.125.436.436 0 0 0 .059-.2.095.095 0 0 0-.026-.063c-.052-.062-.2-.152-.518-.209a3.876 3.876 0 0 0-.612-.053zM8.078 7.8a6.7 6.7 0 0 0 .2-.828c.031-.188.043-.343.038-.465a.613.613 0 0 0-.032-.198.517.517 0 0 0-.145.04c-.087.035-.158.106-.196.283-.04.192-.03.469.046.822.024.111.054.227.09.346z" />
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
