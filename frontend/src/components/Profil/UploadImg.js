import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { uploadPicture } from "../../actions/user.actions";

const UploadImg = () => {
  // const [file, setFile] = useState();
  // const dispatch = useDispatch();
  // const userData = useSelector((state) => state.userReducer);

  // const handlePicture = (e) => {
  //   e.preventDefault();
  //   const data = new FormData();
  //   data.append("name", userData.first_name);
  //   data.append("userId", userData.id);
  //   data.append("file", file);

  //   dispatch(uploadPicture(data, userData.id));
  // };

  return (
 <div>
 Upload
 </div>
  );
};

export default UploadImg;