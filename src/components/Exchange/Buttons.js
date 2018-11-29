import React from "react";
import { Button } from "semantic-ui-react";

const Buttons = props => (

  <div className="m-t-20 centered">
    <Button
     disabled={props.pageId === 0}
     content="Prev"
     icon="left arrow"
     labelPosition="left"
     onClick={props.goPrev}
    />
    <Button
     disabled={(props.pageId+1) * props.pageSize >= props.totalCount}
     content="Next"
     icon="right arrow"
     labelPosition="right"
     onClick={props.goNext}
    />
  </div>
)
export default Buttons;
