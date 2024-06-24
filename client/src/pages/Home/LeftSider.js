import React from "react";

function LeftSider() {
  return (
    <div className="fixed left-0 bottom-0 px-10 sm:static">
      <div className="flex flex-col items-center justify-center">
        <div className="flex flex-col gap-3 sm:flex-row">
          <i class="ri-facebook-circle-line text-gray-400 text-xl"></i>
          <i class="ri-mail-line text-gray-400 text-xl"></i>
          <i class="ri-linkedin-box-line text-gray-400 text-xl"></i>
          <i class="ri-github-line text-gray-400 text-xl"></i>
        </div>
      </div>

      <div className="w-[1px] h-52 bg-[#125f63] ml-2 sm:hidden"></div>
    </div>
  );
}

export default LeftSider;
