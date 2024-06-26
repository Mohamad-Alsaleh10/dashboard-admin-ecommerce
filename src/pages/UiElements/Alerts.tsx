import { useState, useEffect } from 'react';

const Alerts = ({ responseStatus }) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    // Hide the message after 3 seconds
    const timer = setTimeout(() => {
      setIsVisible(false);
    }, 3000);

    // Clear the timer when the component unmounts or isVisible changes
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className={`fixed z-99999 top-9 left-0 w-full p-4 ${isVisible ? 'block' : 'hidden'}`}>
      <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark md:p-6 xl:p-9">
        <div className="flex flex-col gap-7.5">
          {/* <!-- Success Alert Item --> */}
          {responseStatus.success  && (
            <div className="flex w-full border-l-6 border-[#34D399] bg-[#34D399] bg-opacity-[15%] px-7 py-8 shadow-md dark:bg-[#1B1B24] dark:bg-opacity-30 md:p-9">
              <div className="mr-5 flex h-9 w-full max-w-[36px] items-center justify-center rounded-lg bg-[#34D399]">
                {/* Success icon */}
              </div>
              <div className="w-full">
                <h5 className="mb-3 text-lg font-semibold text-black dark:text-[#34D399] ">
                  Successfully
                </h5>
                <p className="text-base leading-relaxed text-body">
                  {responseStatus.message}
                </p>
              </div>
            </div>
          )}

          {/* <!-- Error Alert Item --> */}
          {!responseStatus  && (
            <div className="flex w-full border-l-6 border-[#F87171] bg-[#F87171] bg-opacity-[15%] px-7 py-8 shadow-md dark:bg-[#1B1B24] dark:bg-opacity-30 md:p-9">
              <div className="mr-5 flex h-9 w-full max-w-[36px] items-center justify-center rounded-lg bg-[#F87171]">
                {/* Error icon */}
              </div>
              <div className="w-full">
                <h5 className="mb-3 font-semibold text-[#B45454]">
                  Error
                </h5>
                <ul>
                  <li className="leading-relaxed text-[#CD5D5D]">
                  {responseStatus.message}
                  </li>
                </ul>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Alerts;
