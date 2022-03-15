export async function listHandler(req, res) {
  const body = req.body;

  if (typeof body === "undefined") {
    res
      .status(400)
      .send({ error: "Could not decode request: JSON parsing failed" });
  } else {
    const obj = tryParseJSONObject(body);
    if (obj === false) {
      res
        .status(400)
        .send({ error: "Could not decode request: JSON parsing failed" });
    } else {
      if (obj.hasOwnProperty("payload") !== true) {
        res
          .status(400)
          .send({ error: "Could not decode request: JSON parsing failed" });
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
        res.status(200).send({
          response: finalList,
        });
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
