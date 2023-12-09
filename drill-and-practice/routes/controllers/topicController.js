import * as topicService from "../../services/topicService.js";
import { validasaur } from "../../deps.js";

const listTopics = async({render, user}) => {
  if (user.admin == false){
  const topicsData = {
    topics: await topicService.listTopics(),
  };
  render("topics.eta", topicsData);
} else {
  const topicsData = {
    topics: await topicService.listTopics(),
  };
  render("topicsadmin.eta", topicsData);
}
};

const topicsValidationRules = {
  name: [validasaur.required, validasaur.minLength(1)],
};

const getTopicsData = async (request) => {
  const body = request.body({ type: "form" });
  const params = await body.value;
  return {
    name: params.get("name"),
  }
};

const addTopics = async({request, response, render, user, params}) => {
  if (user.admin == true){
  const topicsData = await getTopicsData(request);
  const [passes, errors] = await validasaur.validate(
    topicsData,
    topicsValidationRules,
  );
  if (!passes) {
    console.log(errors);
    topicsData.validationErrors = errors;
    topicsData.topics = await topicService.listTopics();
    render("topicsadmin.eta", topicsData);
  }
  else {
    await topicService.addTopics(user.id, topicsData.name);
    response.redirect("/topics");
  }
}
};

const deleteTopics = async({request, response, user, params}) => {
  if (user.admin == true) {
    await topicService.deleteTopics(params.id);
    response.redirect("/topics");
  }
}


export {
  listTopics,
  addTopics,
  deleteTopics,
};