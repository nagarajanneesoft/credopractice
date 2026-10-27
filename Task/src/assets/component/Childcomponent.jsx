import { memo } from "react";

export default memo(function Childcomponent() {
  console.log("Child component is rendering....");

  return (
    <div>
      <h2>Child Component</h2>
      <blackquote>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Vero saepe
        soluta omnis inventore quasi, quis cupiditate ipsum maxime, autem ullam
        necessitatibus est odit reprehenderit ratione, cumque nulla earum totam
        delectus.
      </blackquote>
    </div>
  );
});
