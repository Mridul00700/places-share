import Card from "../../shared/components/UIElements/Card";

import "./PlaceList.css";
const PlaceList = (props) => {
  if (props.items.length === 0) {
    return (
      <div className="place-list center">
        <Card>
          <h2> No Places found, maybe create one!</h2>
          <button>Share Place</button>
        </Card>
      </div>
    );
  }

  return <ul className="place-list"></ul>;
};

export default PlaceList;
