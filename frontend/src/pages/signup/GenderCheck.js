import React from "react";

const GenderCheck = ({onCheckBox,selectedGender}) => {
  return (
    <div className="flex mt-3">
      <div className="form-control">
        <label className={`label gap-2 cursor-pointer`}>
          <span className="label-text">Male</span>
          <input type="checkbox" className="checkbox border-slate-900" 
          checked={selectedGender === "male"}
          onChange={()=>onCheckBox("male")}
          />
        </label>
      </div>

      <div className="form-control">
        <label className={`label gap-2 cursor-pointer`}>
          <span className="label-text">Female</span>
          <input type="checkbox" className="checkbox border-slate-900" 
          checked={selectedGender === "female"}
          onChange={()=>onCheckBox("female")}
          />
        </label>
      </div>

    </div>
  );
};

export default GenderCheck;
