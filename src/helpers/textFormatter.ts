const formattedPercentage = (text: string) => {
  if (text.includes('-')) {
    return text.slice(1);
  } else {
    return text;
  }
};

export { formattedPercentage };
