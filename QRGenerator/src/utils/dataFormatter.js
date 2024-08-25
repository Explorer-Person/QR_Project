
function dataFormatter(data) {
    const formatEntry = (entry) => {
      const { id, fk, ...rest } = entry;
      return {
        id: id,
        fk: fk,
        info: rest,
      };
    };
  
    if (Array.isArray(data)) {
      return data.map(formatEntry);
    } else {
      return formatEntry(data);
    }
  }

  module.exports = {dataFormatter}