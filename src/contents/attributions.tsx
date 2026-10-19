import { useEffect } from "react";

export function Attributions() {
  const teamID = import.meta.env.VITE_TEAM_ID;

  useEffect(() => {
    function listenToIframeHeight(e: MessageEvent) {
      if (e.origin === "https://teams.igem.org") {
        const { type, data } = JSON.parse(e.data);
        if (type === "igem-attribution-form") {
          const element = document.getElementById("igem-attribution-form");
          if (element) {
            element.style.height = `${data + 100}px`;
          }
        }
      }
    }
    window.addEventListener("message", listenToIframeHeight);
    return () => {
      window.removeEventListener("message", listenToIframeHeight);
    };
  }, []);

  return (
    <>
      {/*
        ======================================================================
        == VERY IMPORTANT                                                   ==
        ======================================================================
        LEAVE THE IFRAME CODE BELOW AS IT IS, THE ATTRIBUTION FORM OF YOUR TEAM
        WILL BE DISPLAYED ON THIS PAGE. DO NOT REMOVE IT, OTHERWISE YOU RISK OF
        NOT MEETING BRONZE MEDAL CRITERION #2
      */}

      <div className="row mt-4">
        <iframe
          style={{ width: "100%" }}
          id="igem-attribution-form"
          title="iGEM Attributions Form"
          src={`https://teams.igem.org/wiki/${teamID}/attributions`}
        />
      </div>
      {/* ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^ */}
    </>
  );
}
