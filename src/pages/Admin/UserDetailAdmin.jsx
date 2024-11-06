import React, { useState } from "react";

export default function UserDetailAdmin() {
  return (
    <>
      <div className="w-full text-[#543310] ">
        <p className="bg-[#AF8F6F] text-3xl font-bold rounded-lg p-2 text-center shadow-lg">
          USER INFORMATION
        </p>
        <table className=" text-center w-full mt-4 border-collapse">
          <thead>
            <tr className="bg-[#AF8F6F]">
              <th className="border-collapse border p-2">ID</th>
              <th className="border-collapse border p-2">FIRSTNAME</th>
              <th className="border-collapse border p-2">LASTNAME</th>
              <th className="border-collapse border p-2">PHONE</th>
              <th className="border-collapse border p-2">EMAIL</th>
              <th className="border-collapse border p-2">DATE OF BIRTH</th>
              <th className="border-collapse border p-2">GENDER</th>
              <th className="border-collapse border p-2">ROLE</th>
              <th className="border-collapse border p-2">STATUS</th>
            </tr>
          </thead>
          <tbody>
            <tr className="bg-[#F8F4E1]">
              <td className="border-collapse border p-2"></td>
              <td className="border-collapse border p-2"></td>
              <td className="border-collapse border p-2"></td>
              <td className="border-collapse border p-2"></td>
              <td className="border-collapse border p-2"></td>
              <td className="border-collapse border p-2"></td>
              <td className="border-collapse border p-2"></td>
              <td className="border-collapse border p-2">
                <select name="" id="" className="bg-[#F8F4E1]">
                  <option value="">USER</option>
                  <option value="">ADMIN</option>
                  <option value="">PARTNER</option>
                </select>
              </td>
              <td className="border-collapse border p-2">
                <select name="" id="" className="bg-[#F8F4E1]">
                  <option value="">ACTIVE</option>
                  <option value="">INACTIVE</option>
                </select>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </>
  );
}
