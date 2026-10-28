import { memo } from "react";

export default memo(function MemoFooter() {
  console.log("Memo Footer component is rendering.....");
  return (
    <>
      <h6>Memo Footer</h6>
    </>
  );
});
