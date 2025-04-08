import _ from "lodash";

export const memories = _.times(100, (i) => ({
  id: `head${i}`,
  name: `Header${i}`,
  description: `This is the header number ${i}`,
  text: _.times(20, (j) => `<p>Text paragraph ${j} of memory ${i}...</p>`).join(
    "",
  ),
}));
