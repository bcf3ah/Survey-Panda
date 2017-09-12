const regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

export default (emails) => {
  if(!emails){
    return;
  }

  const invalidEmails = emails.split(",").map(email => email.trim()).filter(email => !regex.test(email));
  if(invalidEmails.length){
    if(invalidEmails.length === 1 && invalidEmails[0] === ""){
      return "Please remove any trailing commas on the last email";
    }
    return `These emails are invalid: ${invalidEmails}`;
  }
  return;
}
