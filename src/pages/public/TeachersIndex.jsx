import React, { useEffect, useState } from "react";
import { apiGet } from "../../utils/api";

const TeachersIndex = () => {
  const [teachers, setTeachers] = useState([]);

  useEffect(() => {
    apiGet("/api/teachers").then((data) => setTeachers(data));
  }, []);

  return (
    <div className="container-content">
      <h1>Učitelé</h1>
      <div>
        <table className="table table-responsive" >
          <thead>
            <tr>
              <th>Jméno</th>
              <th>Kontakt</th>
            </tr>
          </thead>
          <tbody>
            {teachers.map((teacher, index) => (
              <tr key={index}>
                <td>
                  {teacher.degree} {teacher.name} 
                </td>
                <td><span>{teacher.email}</span><br/><span> {teacher.telNumber}</span></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TeachersIndex;
