import { postRequest } from '../modules/http';

(function () {
  'use strict'

  //const graphGistId = 'exploring-the-star-wars-social-network'
  const graphGistHost = 'https://graphgist-v3-api.herokuapp.com/graphql'
  // clean graphgistId
  /*
  if (graphGistId.indexOf('/') >= 0) {
    graphGistId = graphGistId.split('/')[0]
  }
  if (graphGistId.indexOf('?') >= 0) {
    graphGistId = graphGistId.split('?')[0]
  }
  */
  /*
  const article = document.querySelector('article.doc')
  const divElement = document.createElement('div')
  divElement.id = 'gist-body'
  divElement.dataset.gistId = '855363c7-cdeb-4c8b-b4a5-b72c8f2388e3'
  divElement.append(article)
  document.querySelector('main.article > .content').prepend(divElement)
  GraphGistRenderer(divElement)
   */

  const neo4jVersion = '3.5'
  const getSessionData = {
    operationName: 'sessionId',
    variables: { neo4j_version: neo4jVersion },
    query: 'query sessionId($neo4j_version: String) { getConsoleSessionId(neo4j_version: $neo4j_version) }',
  }
  postRequest(
    graphGistHost,
    getSessionData,
    undefined,
    function (response) {
      if (response && response.data) {
        //const sessionId = response.data.getConsoleSessionId
        // TODO: store sessionId ?
        const codeBlocks = document.querySelectorAll('.listingblock code[data-lang="cypher"]')
        if (codeBlocks) {
          console.log(codeBlocks)
          //const codeBlocksList = Array.from(codeBlocks)
          /*
          for (const codeBlock of codeBlocksList) {
            console.log(codeBlock.textContent)
          }
          */
          /*
          if (codeBlocksList && codeBlocksList.length > 0) {
            const firstCodeBlock = codeBlocksList[0]
            const executeQueryData = {
              operationName: 'cypherQuery',
              variables: {
                session_id: sessionId,
                neo4j_version: neo4jVersion,
                cypher: firstCodeBlock.textContent,
              },
              query: `query cypherQuery($neo4j_version: String, $session_id: String!, $cypher: String!) {
 queryConsole(neo4j_version: $neo4j_version, session_id: $session_id, cypher: $cypher)
}`,
            }
            // go!
            postRequest(
              graphGistHost,
              executeQueryData,
              undefined,
              function (response) {
                console.log('execute query', response)
              },
              function (error) {
                console.log('error', error)
              }
            )
          }
          */
        }
      }
    },
    function (error) {
      console.log('error', error)
    }
  )

  /*
  postRequest(
    graphgistHost,
    {
      operationName: 'GraphGistDetails',
      // eslint-disable-next-line max-len
      query: 'query GraphGistDetails($id: ID, $slug: String) { GraphGist(filter: { OR: [{ uuid: $id }, { slug: $slug }] }) { uuid title slug summary status query_cache_html raw_html image { source_url } author { name } industries { slug name image { source_url } } use_cases { slug name image { source_url } } }}',
      variables: {
        slug: graphgistId,
        id: graphgistId,
      },
    },
    undefined,
    function (response) {

      GraphGistRenderer(gistBody)
    }, function (error) {
      console.log('error', error)
      // something bad happened!
      //gistBody.html('')
      //$('.marquee-neo .entry-title').html('Could not load GraphGist')
      //gistBody.append('That resource was not found or not available<br/><br/><br/>')
    }
  )
  */
})()
