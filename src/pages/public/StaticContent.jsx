import React from "react";
import { useState, useEffect } from "react";
import { apiGet } from "../../utils/api";
import { Link } from "react-router-dom";

export const BasicDataIndex = ({ isEditable }) => {
  const [basicData, setBasicData] = useState([]);
  const [director, setDirector] = useState({});
  const [deputyDirector, setDeputyDirector] = useState({});

  useEffect(() => {
    apiGet("/api/static/basic-data").then((data) => setBasicData(data));
    apiGet("/api/school-management").then((data) =>
      setDirector(data.filter((item) => item.managementType === "director")[0])
    );
    apiGet("/api/school-management").then((data) =>
      setDeputyDirector(
        data.filter((item) => item.managementType === "deputyDirector")[0]
      )
    );
  }, []);

  const locations = basicData.locationsOfEducation;
  return (
    <div className="container-content">
      <h1 className="mb-3">Základní údaje</h1>
      {isEditable ? (
        <Link
          className="btn btn-success"
          to={"/admin/o-skole/zakladni-udaje/upravit"}
        >
          Upravit
        </Link>
      ) : null}
      <table className="table">
        <tbody>
          <tr>
            <td className="col-6 my-table-background">
              <strong>Jméno školy:</strong>
            </td>
            <td className="my-table-background">{basicData.schoolName}</td>
          </tr>
          <tr>
            <td className="my-table-background">
              <strong>Adresa:</strong>
            </td>
            <td className="my-table-background">{basicData.address}</td>
          </tr>
          <tr>
            <td className="my-table-background">
              <strong>Právní forma:</strong>
            </td>
            <td className="my-table-background">{basicData.legalForm}</td>
          </tr>
          <tr>
            <td className="my-table-background">
              <strong>Nejvyšší povolený počet žáků ve škole:</strong>
            </td>
            <td className="my-table-background">
              {basicData.maxNumberOfStudents}
            </td>
          </tr>
          <tr>
            <td className="my-table-background">
              <strong>Místa poskytovaného vzdělávání:</strong>
            </td>
            <td className="my-table-background">
              {locations &&
                locations
                  .filter((item) => item != false)
                  .map((value, index) => (
                    <span key={index}>
                      {index + 1 + "."} {value}
                      <br />
                    </span>
                  ))}
            </td>
          </tr>
          <tr>
            <td className="my-table-background">
              <strong>Ředitel</strong>
            </td>
            <td className="my-table-background">
              {isEditable ? (
                <Link to={`/admin/kontakty/vedeni-skoly/${director.id}`}>
                  {director.degree} {director.name}
                </Link>
              ) : (
                <Link to={`/kontakty/vedeni-skoly/${director.id}`}>
                  {director.degree} {director.name}
                </Link>
              )}
            </td>
          </tr>
          <tr>
            <td className="my-table-background">
              <strong>Zástupce ředitele:</strong>
            </td>
            <td className="my-table-background">
              {isEditable ? <Link to={`/admin/kontakty/vedeni-skoly/${deputyDirector.id}`}>
                {deputyDirector.degree} {deputyDirector.name}
              </Link> : <Link to={`/kontakty/vedeni-skoly/${deputyDirector.id}`}>
                {deputyDirector.degree} {deputyDirector.name}
              </Link>}
            </td>
          </tr>
          <tr>
            <td className="my-table-background">
              <strong>Zřizovatel:</strong>
            </td>
            <td className="my-table-background">{basicData.founder}</td>
          </tr>
          <tr>
            <td className="my-table-background">
              <strong>IČO:</strong>
            </td>
            <td className="my-table-background">
              {basicData.taxIdentificationNumber}
            </td>
          </tr>
          <tr>
            <td className="my-table-background">
              <strong>IZO:</strong>
            </td>
            <td className="my-table-background">
              {basicData.organizationIdentificationMark}
            </td>
          </tr>
          <tr>
            <td className="my-table-background">
              <strong>REDIZO:</strong>
            </td>
            <td className="my-table-background">{basicData.idNumber}</td>
          </tr>
          <tr>
            <td className="my-table-background">
              <strong>Datová schránka:</strong>
            </td>
            <td className="my-table-background">{basicData.dataBox}</td>
          </tr>
          <tr>
            <td className="my-table-background">
              <strong>Bankovní spojení:</strong>
            </td>
            <td className="my-table-background">{basicData.accountNumber}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export const GroupTrainingScheduleIndex = () => {
  const [schedule, setSchedule] = useState({});

  useEffect(() => {
    apiGet("/api/static/group-training-schedule").then((data) =>
      setSchedule(data)
    );
  }, []);

  return (
    <div className="container-content">
      <h1>Rozvrh kolektivní výuky</h1>
      <p>{schedule.content}</p>
    </div>
  );
};

export const HistoryAndPresentIndex = () => {
  const [historyAndPresent, setHistoryAndPresent] = useState({});

  useEffect(() => {
    apiGet("/api/static/history-and-present").then((data) =>
      setHistoryAndPresent(data)
    );
  }, []);

  return (
    <div className="container-content">
      <h1>Historie a současnost</h1>
      <p>{historyAndPresent.content}</p>
    </div>
  );
};

export const MusicTheoryIndex = () => {
  const [musicTheory, setMusicTheory] = useState({});

  useEffect(() => {
    apiGet("/api/static/music-theory").then((data) => setMusicTheory(data));
  }, []);

  return (
    <div className="container-content">
      <h1>Hudební Nauka</h1>
      <p>{musicTheory.content}</p>
    </div>
  );
};

export const PersonalDataProtectionIndex = () => {
  const [personalDataProtection, setPersonalDataProtection] = useState({});

  useEffect(() => {
    apiGet("/api/static/personal-data-protection").then((data) =>
      setPersonalDataProtection(data)
    );
  }, []);

  return (
    <div className="container-content">
      <h1>Ochrana osobních údajů</h1>
      <p>{personalDataProtection.content}</p>
    </div>
  );
};

export const RequiredInforamtionIndex = () => {
  const [requiredInformation, setRequiredInformation] = useState({});
  //set loading of specific part of object from API, Oficiální název, Kontaktní poštovní adresa
  const [basicData, setBasicData] = useState({});

  useEffect(() => {
    apiGet("/api/static/required-info").then((data) =>
      setRequiredInformation(data)
    );
    apiGet("/api/static/basic-data").then((data) => setBasicData(data));
  }, []);

  return (
    <div className="container-content">
      <h1>Povinně zveřejňované informace</h1>
    </div>
  );
};

export const StudyFocusIndex = () => {
  const [studyFocus, setStudyFocus] = useState("");

  useEffect(() => {
    apiGet("/api/static/study-focus").then((data) => setStudyFocus(data));
  });
  return (
    <div className="container-content">
      <h1>Studijní zameření</h1>
      <div dangerouslySetInnerHTML={{ __html: studyFocus.content }}></div>
    </div>
  );
};

export const SchoolFeeIndex = () => {
  const [schoolFee, setSchoolFee] = useState({});

  useEffect(() => {
    apiGet("/api/static/school-fee").then((data) => setSchoolFee(data));
  }, []);

  return (
    <div className="container-content">
      <h1>Školné</h1>
      <p>{schoolFee.content}</p>
    </div>
  );
};
