import React from "react";

interface Props {
  msg: String;
}

const Alert: React.FC<Props> = ({ msg }) => {
  return (
    <div className=" mx-auto mb-4 w-10/12 rounded-lg bg-red-500 p-2.5 text-center text-lg text-white">
      Password must match
    </div>
  );
};

export default Alert;
