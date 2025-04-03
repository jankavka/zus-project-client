import React from "react";
import { useState, useEffect } from "react";
import { apiGet } from "../../utils/api";

export const BasicDataIndex = () => {
  return (
    <div className="container-content">
      <h1>Základní údaje</h1>
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
    apiGet("/api/static/required-info").then((data) => setRequiredInformation(data));
    apiGet("/api/static/basic-data").then((data) => setBasicData(data));
  }, []);

  return (
    <div className="container-content">
      <h1>Povinně zveřejňované informace</h1>
    </div>
  );
};

export const StudyFocusIndex = () => {
  return (
    <div className="container-content">
      <h1>Studijní zameření</h1>
    </div>
  );
};

export const SchoolFeeIndex = () => {
  const [schoolFee, setSchoolFee] = useState({});

  useEffect(() => {
    apiGet("/api/static/school-fee").then((data) => setSchoolFee(data));
  }, []);

  return(
    <div className="container-content">
      <h1>Školné</h1>
      <p>{schoolFee.content}</p>
    </div>
  )
};
