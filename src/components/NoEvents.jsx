//for case there is no events in fetched google calendar
const NoEvents = ({ isHidden }) => {
  return (
    <div style={{ marginLeft: "0" }} hidden={isHidden}>
      Žádné nadcházející události
    </div>
  );
};

export default NoEvents;
