export const parseResponseMessage = (message) => {
  const array = message.split(':::');

  try{
    const object = JSON.parse(array.length === 3 ? array[2] : array[0]);

    if(object.error || object.errorType) {
      return {
        error: true,
        message: object.error || object.errorType || object.toString()
      }
    }
  } catch (e) {
    console.log('Response Parsing Error Message => ', e.toString());
  }

  return {
    error: null,
    processId: array[1],
    data: JSON.parse(array[2]),
  }
};
