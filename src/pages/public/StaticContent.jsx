import React from "react";
import { useState, useEffect } from "react";
import { apiGet } from "../../utils/api";
import { Link } from "react-router-dom";
import useMedia from "use-media";

export const BasicDataIndex = ({ isEditable }) => {
  const [basicData, setBasicData] = useState([]);
  const [director, setDirector] = useState({});
  const [deputyDirector, setDeputyDirector] = useState({});
  //const isMobile = useMedia({maxWidth: "767px"})
  
  //mobile or tablet
  const isMobile = useMedia({maxWidth: "991px"})

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
      <h5 className=" text-uppercase mb-3">Základní údaje</h5>
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
            <td className={`my-table-background`}>
              {locations &&
                locations
                  .filter((item) => item != false)
                  .map((value, index) => (
                    <span className={`${isMobile ? "" : "text-nowrap"}`} key={index}>
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
              {isEditable ? (
                <Link to={`/admin/kontakty/vedeni-skoly/${deputyDirector.id}`}>
                  {deputyDirector.degree} {deputyDirector.name}
                </Link>
              ) : (
                <Link to={`/kontakty/vedeni-skoly/${deputyDirector.id}`}>
                  {deputyDirector.degree} {deputyDirector.name}
                </Link>
              )}
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
              {basicData.identificationNumber}
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

export const GroupTrainingScheduleIndex = ({ isEditable }) => {
  const [schedule, setSchedule] = useState({});

  useEffect(() => {
    apiGet("/api/static/group-training-schedule").then((data) =>
      setSchedule(data)
    );
  }, []);

  return (
    <div className="container-content">
      <h5 className="text-uppercase">Rozvrh kolektivní výuky</h5>
      {isEditable ? (
        <Link
          className="btn btn-warning mb-3"
          to={"/admin/pro-rodice-a-zaky/rozvrh-kolektivni-vyuky/upravit"}
        >
          Upravit
        </Link>
      ) : null}
      <div dangerouslySetInnerHTML={{ __html: schedule.content }}></div>
    </div>
  );
};

export const HistoryAndPresentIndex = ({ isEditable }) => {
  const [historyAndPresent, setHistoryAndPresent] = useState({});

  useEffect(() => {
    apiGet("/api/static/history-and-present").then((data) =>
      setHistoryAndPresent(data)
    );
  }, []);

  return (
    <div className="container-content">
      <h5 className="text-uppercase">Historie a současnost</h5>
      <div
        dangerouslySetInnerHTML={{ __html: historyAndPresent.content }}
      ></div>
      {isEditable ? (
        <Link
          className="btn btn-warning"
          to="/admin/o-skole/historie-a-soucasnost/upravit"
        >
          Upravit
        </Link>
      ) : null}
    </div>
  );
};

export const MusicTheoryIndex = ({ isEditable }) => {
  const [musicTheory, setMusicTheory] = useState({});

  useEffect(() => {
    apiGet("/api/static/music-theory").then((data) => setMusicTheory(data));
  }, []);

  return (
    <div className="container-content">
      <h5 className="text-uppercase">Hudební Nauka</h5>
      {isEditable ? (
        <Link
          className="btn btn-warning"
          to={"/admin/pro-rodice-a-zaky/hudebni-nauka/upravit"}
        >
          Upravit
        </Link>
      ) : null}
      <div dangerouslySetInnerHTML={{ __html: musicTheory.content }}></div>
    </div>
  );
};

export const PersonalDataProtectionIndex = ({ isEditable }) => {
  const [personalDataProtection, setPersonalDataProtection] = useState({});

  useEffect(() => {
    apiGet("/api/static/personal-data-protection").then((data) =>
      setPersonalDataProtection(data)
    );
  }, []);

  return (
    <div className="container-content">
      <h5 className="text-uppercase">Ochrana osobních údajů</h5>
      {isEditable ? (
        <Link
          className="btn btn-warning mb-3"
          to={"/admin/uredni-deska/ochrana-osobnich-udaju/upravit"}
        >
          Upravit
        </Link>
      ) : null}
      <div
        dangerouslySetInnerHTML={{ __html: personalDataProtection.content }}
      ></div>
    </div>
  );
};

export const RequiredInforamtionIndex = ({ isEditable }) => {
  const [requiredInformation, setRequiredInformation] = useState({
    organizationalStructure: [],
    regulations: [],
    annualReport: [],
  });
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
      <h5 className="text-uppercase">Povinně zveřejňované informace</h5>
      {isEditable ? (
        <Link
          className="btn btn-warning mb-3"
          to="/admin/uredni-deska/povinne-info/upravit"
        >
          Upravit
        </Link>
      ) : null}
      <ul>
        <li>
          <strong>Oficiální název:</strong> {basicData.schoolName}
        </li>
        <li>
          <strong>Důvod a způsob založení: </strong>{" "}
          {requiredInformation.founding}
        </li>
        <li>
          <strong>Organizační struktura: </strong>
          <ul>
            {requiredInformation.organizationalStructure.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        </li>
        <li>
          <strong>Kontakntí spojení</strong>
          <ul>
            <li>Kontaktní poštovní adresa: {basicData.address} </li>
            <li>Úřední hodiny: {requiredInformation.officeHours} </li>
            <li>Telefonní čísla: {requiredInformation.telNumbers} </li>
            <li>
              Adresa internetových stránek: {requiredInformation.website}{" "}
            </li>
            <li>Adresa podatelny: {basicData.address}</li>
            <li>
              Elektronická adresa podatelny: {basicData.emailMailingAddress}{" "}
            </li>
            <li>Datová schránka: {basicData.dataBox}</li>
          </ul>
        </li>
        <li>
          <strong>Bankovní spojení: </strong>
          {basicData.accountNumber}
        </li>
        <li>
          <strong>IČO: </strong>
          {basicData.identificationNumber}
        </li>
        <li>
          <strong>DIČ: </strong>
          {basicData.taxIdentificationNumber}
        </li>
        <li>
          <strong>Dokumenty: </strong>Viz menu úřední deska
        </li>
        <li>
          <strong>Žádosti o informace: </strong>
          <ul>
            <li>
              prostřednictvím elektronické pošty:{" "}
              {basicData.eamilMailingAddress}
            </li>
            <li>prostřednictvím datové schránky: {basicData.dataBox}</li>
            <li>písemně na adresu: {basicData.address}</li>
            <li>osobně: v sídle organizace na výše uvedené adrese</li>
          </ul>
        </li>
        <li>
          <strong>Příjem a podání podnětů: </strong>
          <ul>
            <li>
              Osoba určená k přijímání žádosti a vyřizování stížností, podnětů a
              oznámení:
              <ul>
                <li>{requiredInformation.submissionsAndSuggestions}</li>
              </ul>
            </li>
          </ul>
        </li>
        <li>
          <strong>Předpisy: </strong>
          <ul>
            <li>
              Nejdůležitější používané předpisy:
              <ul>
                {requiredInformation.regulations
                  .filter((item) => item !== " ")
                  .map((item, index) => (
                    <li key={index}>{item}</li>
                  ))}
              </ul>
            </li>
          </ul>
        </li>
        <li>
          <strong>Úhrady za poskytování informací: </strong>
          <ul>
            <li>
              Sazebník úhrad za poskytování informací:
              <ul>
                <li>{requiredInformation.paymentsForProvidingInformation}</li>
              </ul>
            </li>
          </ul>
        </li>
        <li>
          <strong>Licenční smlouvy: </strong>{" "}
          {requiredInformation.licenseAgreements}
        </li>
        <li>
          <strong>Výroční zpráva podle zákona č. 106/1999 Sb.:</strong>
          <ul>
            {requiredInformation &&
              requiredInformation.annualReport
                .filter((item) => item !== " ")
                .map((item, index) => <li key={index}>{item}</li>)}
          </ul>
        </li>
      </ul>
    </div>
  );
};

export const StudyFocusIndex = ({ isEditable }) => {
  const [studyFocus, setStudyFocus] = useState("");

  useEffect(() => {
    apiGet("/api/static/study-focus").then((data) => setStudyFocus(data));
  }, []);
  return (
    <div className="container-content">
      <h5 className="text-uppercase">Studijní zameření</h5>
      {isEditable ? (
        <Link
          className="btn btn-warning mb-3"
          to={"/admin/o-skole/studijni-zamereni/upravit"}
        >
          Upravit
        </Link>
      ) : null}
      <div dangerouslySetInnerHTML={{ __html: studyFocus.content }}></div>
    </div>
  );
};

export const SchoolFeeIndex = ({ isEditable }) => {
  const [schoolFee, setSchoolFee] = useState({});

  useEffect(() => {
    apiGet("/api/static/school-fee").then((data) => setSchoolFee(data));
  }, []);

  return (
    <div className="container-content">
      <h5 className="text-uppercase">Školné</h5>
      {isEditable ? (
        <Link
          className="btn btn-warning mb-3"
          to={"/admin/pro-rodice-a-zaky/skolne/upravit"}
        >
          Upravit
        </Link>
      ) : null}
      <div dangerouslySetInnerHTML={{ __html: schoolFee.content }}></div>
    </div>
  );
};
