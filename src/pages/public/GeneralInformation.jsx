import useMedia from "use-media";
import { useState, useEffect } from "react";
import { apiGet } from "../../utils/api";
import FlashMessage from "../../components/FlashMessage";
import { messages } from "../../components/FlashMessageTexts";

const GeneralInformation = () => {
  const isMobile = useMedia({ maxWidth: "767px" });
  const [basicData, setBasicData] = useState({});
  const [loadingErrorState, setLoadingErrorState] = useState(false);

  useEffect(() => {
    apiGet("/api/static/basic-data")
      .then((data) => setBasicData(data))
      .catch((error) => {
        setLoadingErrorState(true);
        console.error(error);
      });
  }, []);

  console.log(basicData);

  return (
    <div className="container-content">
      <h5 className="text-uppercase mb-3">Obecné informace</h5>
      <FlashMessage
        success={false}
        state={loadingErrorState}
        text={messages.dataLoadErr}
      />
      <table className="table mb-3">
        <tbody>
          <tr>
            <td>Název školy</td>
            <td>{basicData.schoolName}</td>
          </tr>
          <tr>
            <td>Adresa</td>
            <td>{basicData.address}</td>
          </tr>
          <tr>
            <td>IČO</td>
            <td>{basicData.identificationNumber}</td>
          </tr>
          <tr>
            <td>IZO</td>
            <td>{basicData.organizationIdentificationMark}</td>
          </tr>
          <tr>
            <td>REDIZO</td>
            <td>{basicData.idNumber}</td>
          </tr>
          <tr>
            <td>Datová schránka:</td>
            <td>{basicData.dataBox}</td>
          </tr>
          <tr>
            <td>Bankovní spojení</td>
            <td>{basicData.accountNumber}</td>
          </tr>
        </tbody>
      </table>
      <iframe
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2079.133253521678!2d18.33942646045231!3d49.67336408690235!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4713f7271cf12995%3A0x8bc369cb4d19f99c!2zxIxlc2tvc2xvdmVuc2vDqSBhcm3DoWR5IDQ4MSwgNzM4IDAxIEZyw71kZWstTcOtc3RlayAx!5e0!3m2!1scs!2scz!4v1743954612597!5m2!1scs!2scz"
        width={isMobile ? 300 : 600}
        height={isMobile ? 300 : 400}
      ></iframe>
    </div>
  );
};

export default GeneralInformation;
