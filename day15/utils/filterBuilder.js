const { Op } = require("sequelize");

const buildFilter = (query) => {
  if (!query.filter) {
    console.log("No filter provided, returning null");
    return null;
  }

  const filter = {};
  const filters = Array.isArray(query.filter) ? query.filter : [query.filter];

  filters.forEach((f) => {
    const [fieldPath, operator, ...values] = f.split(",");
    let value = values.join(",");

    const fieldParts = fieldPath.split(".");
    let currentFilter = filter;

    if (fieldParts.length > 1) {
      const [relation, field] = fieldParts;
      if (!filter["$nested"]) filter["$nested"] = {};
      if (!filter["$nested"][relation]) filter["$nested"][relation] = {};
      currentFilter = filter["$nested"][relation];
      fieldPath = field;
    }

    switch (operator) {
      case "cs":
        currentFilter[fieldPath] = { [Op.like]: `%${value}%` };
        break;
      case "sw":
        currentFilter[fieldPath] = { [Op.startsWith]: value };
        break;
      case "ew":
        currentFilter[fieldPath] = { [Op.endsWith]: value };
        break;
      case "eq":
        currentFilter[fieldPath] = value;
        break;
      case "ne":
        currentFilter[fieldPath] = { [Op.ne]: value };
        break;
      case "lt":
        currentFilter[fieldPath] = { [Op.lt]: Number(value) };
        break;
      case "le":
        currentFilter[fieldPath] = { [Op.lte]: Number(value) };
        break;
      case "ge":
        currentFilter[fieldPath] = { [Op.gte]: Number(value) };
        break;
      case "gt":
        currentFilter[fieldPath] = { [Op.gt]: Number(value) };
        break;
      case "bt":
        const [min, max] = value.split(",");
        currentFilter[fieldPath] = { [Op.between]: [Number(min), Number(max)] };
        break;
      case "in":
        currentFilter[fieldPath] = { [Op.in]: value.split(",") };
        break;
      case "is":
        currentFilter[fieldPath] =
          value.toLowerCase() === "null" ? null : { [Op.not]: null };
        break;
      // Negated operators
      case "ncs":
        currentFilter[fieldPath] = { [Op.notLike]: `%${value}%` };
        break;
      case "nsw":
        currentFilter[fieldPath] = { [Op.notStartsWith]: value };
        break;
      case "new":
        currentFilter[fieldPath] = { [Op.notEndsWith]: value };
        break;
      case "neq":
        currentFilter[fieldPath] = { [Op.ne]: value };
        break;
      case "nlt":
        currentFilter[fieldPath] = { [Op.gte]: Number(value) };
        break;
      case "nle":
        currentFilter[fieldPath] = { [Op.gt]: Number(value) };
        break;
      case "nge":
        currentFilter[fieldPath] = { [Op.lt]: Number(value) };
        break;
      case "ngt":
        currentFilter[fieldPath] = { [Op.lte]: Number(value) };
        break;
      case "nbt":
        const [nMin, nMax] = value.split(",");
        currentFilter[fieldPath] = {
          [Op.notBetween]: [Number(nMin), Number(nMax)],
        };
        break;
      case "nin":
        currentFilter[fieldPath] = { [Op.notIn]: value.split(",") };
        break;
      default:
        break;
    }
  });

  console.log("Built filter:", JSON.stringify(filter, null, 2));
  return filter;
};

module.exports = buildFilter;
