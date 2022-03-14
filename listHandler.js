export async function listHandler(req, res) {
  const body = req.body;

  if (typeof body === "undefined") {
    res
      .send({ error: "Could not decode request: JSON parsing failed" })
      .status(400);
  } else {
    const obj = tryParseJSONObject(body);
    console.log("json parse", obj);
    if (obj === false) {
      res
        .send({ error: "Could not decode request: JSON parsing failed" })
        .status(400);
    } else {
      if (obj.hasOwnProperty("payload") !== true) {
        res
          .send({ error: "Could not decode request: JSON parsing failed" })
          .status(400);
      } else {
        let finalList = obj.payload
          .filter((show) => {
            return show.drm && show.episodeCount > 0;
          })
          .map((show) => {
            return {
              image: show?.image?.showImage,
              slug: show?.slug,
              title: show?.title,
            };
          });
        res
          .send({
            response: finalList,
          })
          .status(200);
      }
    }
  }
}

function tryParseJSONObject(jsonString) {
  try {
    var o = JSON.parse(jsonString);

    // Handle non-exception-throwing cases:
    // Neither JSON.parse(false) or JSON.parse(1234) throw errors, hence the type-checking,
    // but... JSON.parse(null) returns null, and typeof null === "object",
    // so we must check for that, too. Thankfully, null is falsey, so this suffices:
    if (o && typeof o === "object") {
      return o;
    }
  } catch (e) {}

  return false;
}
