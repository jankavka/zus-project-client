import { useEffect, useState } from "react";
import FormInput from "../../components/FormInput";
import { apiGet, apiPost } from "../../utils/api";
import { useNavigate } from "react-router-dom";
import formatDate from "../../components/formatDate";
import { addInput, removeInput } from "../../components/InputManagement";

const RequiredInforamtionForm = () => {
  const [fieldRegulationsCounter, setFieldRegulationsCounter] = useState(1);
  const [regulations, setRegulations] = useState([" "]);
  const [annualReport, setAnnualReport] = useState([" "]);
  const [fieldReportCounter, setFieldReportCounter] = useState(1);
  const [requieredInformation, setRequiredInformation] = useState({
    founding: "",
    organizationalStructure: [],
    officeHours: "",
    telNumbers: "",
    website: "",
    documents: "",
    submissionsAndSuggestions: "",
    paymentsForProvidingInformation: "",
    licenseAgreements: "",
    annualReport: [],
    regulations: [],
  });
  const [basicData, setBasicData] = useState({
    schoolName: "",
    mailingAddress: "",
    emailMailingAddress: "",
    dataBox: "",
    accountNumber: "",
    identificationNumber: "",
    taxIdentificationNumber: "",
  });
  const navigate = useNavigate();

  useEffect(() => {
    apiGet("/api/static/basic-data").then((data) => setBasicData(data));
    apiGet("/api/static/required-info").then((data) =>
      setRequiredInformation(data)
    );
    apiGet("/api/static/required-info").then((data) => {
      setRegulations(data.regulations);
    });
    apiGet("/api/static/required-info").then((data) => {
      setFieldRegulationsCounter(
        data.regulations.filter(
          (item) => item !== " " && item !== null && item !== undefined
        ).length
      );
    });
    apiGet("/api/static/required-info").then((data) => {
      setAnnualReport(data.annualReport);
    });
    apiGet("/api/static/required-info").then((data) => {
      setFieldReportCounter(
        data.annualReport.filter(
          (item) => item !== " " && item !== null && item !== undefined
        ).length
      );
    });
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    const bodyRequiredInfo = {
      ...requieredInformation,
      regulations: regulations,
      annualReport: annualReport,
    };
    //setRequiredInformation({...requieredInformation, regulations: [...regulations] })
    apiPost("/api/static/required-info/create-or-edit", bodyRequiredInfo)
      .catch((error) => console.log(error))
      .then(
        apiPost("/api/static/basic-data/create-or-edit", basicData)
          .catch((error) => console.log(error))
          .then(() => navigate("/admin/uredni-deska/povinne-info"))
      );
  };

  const handleChangeBasicData = (e) => {
    setBasicData({ ...basicData, [e.target.name]: e.target.value });
  };

  const handleChangeRequiredInfo = (e) => {
    setRequiredInformation({
      ...requieredInformation,
      [e.target.name]: e.target.value,
    });
  };

  const handleChangeOrganizationalStructure = (e) => {
    const orgStructureValues = e.target.value;
    console.log(typeof orgStructureValues);
    const newArray = orgStructureValues.split(",");
    console.log(...newArray);
    setRequiredInformation({
      ...requieredInformation,
      organizationalStructure: [...newArray],
    });
  };

  const handleChangeRegulations = (e, index) => {
    setRegulations((prev) => {
      let newRegulations = prev;
      newRegulations[index] = e.target.value;

      return [...newRegulations];
    });
  };

  const handleChangeAnnualReport = (e, index) => {
    setAnnualReport((prev) => {
      let newAnnualReports = prev;
      newAnnualReports[index] = e.target.value;

      return [...newAnnualReports];
    });
  };

  useEffect(() => {
    console.log(regulations);
    //console.log(requieredInformation);
  }, [regulations]);

  return (
    <div className="container-content">
      <h5 className="text-uppercase">Povinně zveřejňované inforamce</h5>
      <p>
        <strong>Naposledy upraveno: </strong>
        {formatDate(new Date(requieredInformation.issuedDate))}
      </p>
      <form onSubmit={handleSubmit}>
        <div>
          <FormInput
            label="Oficiální název"
            name="schoolName"
            value={basicData.schoolName}
            onChange={handleChangeBasicData}
          />
        </div>
        <div>
          <FormInput
            isInput={false}
            label="Důvod a způsob založení"
            name="founding"
            value={requieredInformation.founding}
            onChange={handleChangeRequiredInfo}
          />
        </div>
        <div className="mb-4">
          <FormInput
            label="Organizační struktura - (jednotlivé položky oddělte čárkou)"
            name="organizationalStructure"
            value={requieredInformation.organizationalStructure}
            onChange={handleChangeOrganizationalStructure}
          />
        </div>
        <hr />
        <div className="mb-2">(Kontaktní spojení)</div>
        <div>
          <FormInput
            label="Kontaktní poštovní adresa (adresa podatelny)"
            name="mailingAddress"
            value={basicData.mailingAddress}
            onChange={handleChangeBasicData}
          />
        </div>
        <div>
          <FormInput
            label="Úřední hodiny"
            value={requieredInformation.officeHours}
            name="officeHours"
            onChange={handleChangeRequiredInfo}
          />
        </div>
        <div>
          <FormInput
            label="Telefonní čísla"
            value={requieredInformation.telNumbers}
            name="telNumbers"
            onChange={handleChangeRequiredInfo}
          />
        </div>
        <div>
          <FormInput
            label="Adresa internetových stránek"
            value={requieredInformation.website}
            name="website"
            onChange={handleChangeRequiredInfo}
          />
        </div>
        <div>
          <FormInput
            label="Elektronická adresa podatelny"
            value={basicData.emailMailingAddress}
            name="emailMailingAddress"
            onChange={handleChangeBasicData}
          />
        </div>
        <div className="mb-5">
          <FormInput
            label="datová schránka"
            value={basicData.dataBox}
            name="dataBox"
            onChange={handleChangeBasicData}
          />
        </div>
        <hr />
        <div>
          <FormInput
            label="Bankovní spojení"
            value={basicData.accountNumber}
            name="accountNumber"
            onChange={handleChangeBasicData}
          />
        </div>
        <div>
          <FormInput
            label="IČO"
            value={basicData.identificationNumber}
            name="indentificationNumber"
            onChange={handleChangeBasicData}
          />
        </div>
        <div>
          <FormInput
            label="DIČ"
            value={basicData.taxIdentificationNumber}
            onChange={handleChangeBasicData}
            name="taxIdentificationNumber"
          />
        </div>
        <div>
          <FormInput
            label="Dokumenty"
            value={requieredInformation.documents}
            onChange={handleChangeRequiredInfo}
            name="documents"
          />
        </div>
        <div>
          <FormInput
            label="Příjem a podání podnětů"
            isInput={false}
            name="submissionsAndSuggestions"
            value={requieredInformation.submissionsAndSuggestions}
            onChange={handleChangeRequiredInfo}
          />
        </div>
        <hr />
        <div className="mt-3">
          <label className="mb-3">Předpisy</label>
          <div>
            <button
              className="btn btn-info mb-3"
              type="button"
              onClick={() =>
                addInput(
                  fieldRegulationsCounter,
                  setFieldRegulationsCounter,
                  20
                )
              }
            >
              Pridej pole
            </button>
            {Array.from(Array(fieldRegulationsCounter).keys()).map(
              (item, index) => {
                //console.log("index, item: " + index + " " + item);
                return (
                  <div key={index}>
                    <input
                      className="form-control mb-3"
                      name={item}
                      type="text"
                      onChange={(e) => handleChangeRegulations(e, index)}
                      value={regulations[index] || " "}
                    />
                    {index === fieldRegulationsCounter - 1 ? (
                      <div>
                        <button
                          onClick={() =>
                            removeInput(
                              index,
                              fieldRegulationsCounter,
                              setFieldRegulationsCounter,
                              setRegulations
                            )
                          }
                          type="button"
                          className="btn btn-primary mb-3"
                        >
                          Odebrat pole
                        </button>
                        <p>
                          <small>
                            Odebráním pole dojde k vymazání jeho obsahu
                          </small>
                        </p>
                      </div>
                    ) : null}
                    <hr />
                  </div>
                );
              }
            )}
          </div>
        </div>
        <div>
          <FormInput
            label="Úhrady za poskytování informací"
            name="paymentsForProvidingInformation"
            value={requieredInformation.paymentsForProvidingInformation}
            onChange={handleChangeRequiredInfo}
          />
        </div>
        <div>
          <FormInput
            label="Licenční smlouvy"
            name="licenseAgreements"
            value={requieredInformation.licenseAgreements}
            onChange={handleChangeRequiredInfo}
          />
        </div>
        <div className="mb-3">
          <label className="mb-2">
            Výroční zpráva podle zákona č. 106/1999 Sb.:
          </label>
          <div>
            <button
              className="btn btn-info mb-3"
              type="button"
              onClick={() =>
                addInput(fieldReportCounter, setFieldReportCounter, 10)
              }
            >
              Pridej pole
            </button>
            {Array.from(Array(fieldReportCounter).keys()).map((item, index) => {
              return (
                <div key={index}>
                  <input
                    type="text"
                    className="form-control mb-3"
                    name={item}
                    onChange={(e) => handleChangeAnnualReport(e, index)}
                    value={annualReport[index] || " "}
                  />
                  {index === fieldReportCounter - 1 ? (
                    <div>
                      <button
                        onClick={() =>
                          removeInput(
                            index,
                            fieldReportCounter,
                            setFieldReportCounter,
                            setAnnualReport
                          )
                        }
                        type="button"
                        className="btn btn-primary mb-3"
                      >
                        Odebrat pole
                      </button>
                      <p>
                        <small>
                          Odebráním pole dojde k vymazání jeho obsahu
                        </small>
                      </p>
                    </div>
                  ) : null}
                  <hr />
                </div>
              );
            })}
          </div>
        </div>
        <div>
          <button type="submit" className="btn btn-success me-3">
            Uložit
          </button>
          <button className="btn btn-info" type="button" onClick={() => navigate(-1)}>Zpět</button>
        </div>
      </form>
      
    </div>
  );
};

export default RequiredInforamtionForm;
