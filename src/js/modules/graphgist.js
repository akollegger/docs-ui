import { postRequest } from './http'

const graphGistHost = 'https://graphgist-v3-api.herokuapp.com/graphql'

const sendRequest = function (data) {
  return new Promise((resolve, reject) => {
    try {
      postRequest(
        graphGistHost,
        data,
        undefined,
        function (response) {
          resolve(response)
        }, function (error) {
          reject(error)
        })
    } catch (error) {
      reject(error)
    }
  })
}

/**
 * Initializes a GraphGist session and returns a sessionId
 * @param neo4jVersion
 * @returns {Promise<Object>}
 */
export async function initSession (neo4jVersion = '3.5') {
  const getSessionData = {
    operationName: 'sessionId',
    variables: { neo4j_version: neo4jVersion },
    query: 'query sessionId($neo4j_version: String) { getConsoleSessionId(neo4j_version: $neo4j_version) }',
  }
  return sendRequest(getSessionData)
}

/**
 * Execute a Cypher query
 * @param cypherQuery
 * @param sessionId
 * @param neo4jVersion
 * @returns {Promise<Object>}
 */
export async function executeQuery (cypherQuery, sessionId, neo4jVersion = '3.5') {
  const executeQueryData = {
    operationName: 'cypherQuery',
    variables: {
      session_id: sessionId,
      neo4j_version: neo4jVersion,
      cypher: cypherQuery,
    },
    query: `query cypherQuery($neo4j_version: String, $session_id: String!, $cypher: String!) {
 queryConsole(neo4j_version: $neo4j_version, session_id: $session_id, cypher: $cypher)
}`,
  }
  return sendRequest(executeQueryData)
}

/**
 * Get featured GraphGists
 * @returns {Promise<Object>}
 */
export async function getFeatured () {
  return sendRequest({
    query: `{
  GraphGist(featured: true) {
    uuid title slug summary image { source_url } author { name } industries { slug name } use_cases { slug name }
  }
}`,
  })
}

/**
 * Get industries.
 * @returns {Promise<Object>}
 */
export async function getIndustries () {
  return sendRequest({
    query: `{
  Industry {
    uuid name slug image { source_url }
  }
}`,
  })
}

/**
 * Get use cases.
 * @returns {Promise<Object>}
 */
export async function getUseCases () {
  return sendRequest({
    query: `{
  UseCase {
    uuid name slug image { source_url }
  }
}`,
  })
}

/**
 * Get gists per category
 * @param category {string}
 * @returns {Promise<Object>}
 */
export async function getGistsPerCategory (category) {
  return sendRequest({
    operationName: 'GraphGistsByCategory',
    query: `query GraphGistsByCategory($slug: String!) {
  GraphGist: graphGistsByCategory(slug: $slug) {
    uuid title slug summary image { source_url } author { name } industries { slug name } use_cases { slug name }
  }
}`,
    variables: {
      slug: category,
    },
  })
}
