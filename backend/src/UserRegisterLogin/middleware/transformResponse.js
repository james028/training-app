function transformIds(obj) {
  // Null/undefined
  if (obj === null || obj === undefined) {
    return obj;
  }

  // ✅ Date - zwróć jako ISO string
  if (obj instanceof Date) {
    return obj.toISOString();
  }

  // ✅ ObjectId - zwróć jako string
  if (obj.constructor && obj.constructor.name === "ObjectId") {
    return obj.toString();
  }

  // Array
  if (Array.isArray(obj)) {
    return obj.map((item) => transformIds(item));
  }

  // Object
  if (typeof obj === "object") {
    const result = {};

    for (const [key, value] of Object.entries(obj)) {
      if (key === "_id") {
        result.id = value?.toString();
      } else if (key === "__v") {
        continue;
      } else {
        result[key] = transformIds(value);
      }
    }

    return result;
  }

  // Primitive
  return obj;
}

exports.transformResponse = (req, res, next) => {
  const originalJson = res.json.bind(res);

  res.json = function (data) {
    const transformed = transformIds(data);
    return originalJson(transformed);
  };

  next();
};
