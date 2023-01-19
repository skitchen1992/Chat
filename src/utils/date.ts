export const getDateTime = (value?: string)=>{
  if(value){
    return new Date(value).toLocaleString()
  }
  return "No date"
}
