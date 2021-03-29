import { getFeatured, getIndustries, getUseCases } from './modules/graphgist'
import { createElement } from './modules/dom'

document.addEventListener('DOMContentLoaded', async function () {
  const graphGistsBodyElement = document.querySelector('body.graphgists')
  if (!graphGistsBodyElement) return

  function toListItem (items) {
    return items.map((item) => {
      const liElement = document.createElement('li')
      const span = document.createElement('span')
      span.textContent = item.name
      const img = document.createElement('img')
      if (item.image && item.image.length > 0) {
        img.src = item.image[0].source_url
      }
      liElement.appendChild(img)
      liElement.appendChild(span)
      return liElement
    })
  }

  function toGraphGistCardItem (items) {
    return items.map((item) => {
      const liElement = createElement('li')
      const illustrationElement = createElement('div', 'graphgist-illustration')
      const imageUrl = item.image && item.image.length > 0
        ? item.image[0].source_url
        : 'https://dist.neo4j.com/wp-content/uploads/20160303103313/noun_22440-grey-02.png' // default image
      illustrationElement.style = `background-image: url('${imageUrl}')`
      const anchorElement = createElement('a', undefined, [illustrationElement])
      // title
      const titleElement = createElement('h3')
      titleElement.textContent = item.title
      // info
      const graphGistInfo = []
      // author
      const authorTitle = createElement('dt')
      authorTitle.textContent = 'Author'
      const authorDescription = createElement('dd')
      authorDescription.textContent = item.author ? item.author.name : ''
      graphGistInfo.push(authorTitle, authorDescription)
      // Industries
      const industries = item.industries
      if (industries && industries.length > 0) {
        const industryTitle = createElement('dt')
        industryTitle.textContent = 'Industries'
        const industryDescription = createElement('dd', undefined, [createElement('ul', 'graphgist-industries', industries.map((industry) => {
          const industryItem = createElement('li')
          // TODO: use slug to create a link!
          industryItem.textContent = industry.name
          return industryItem
        }))])
        graphGistInfo.push(industryTitle)
        graphGistInfo.push(industryDescription)
      }
      // Use cases
      const useCases = item.use_cases
      if (useCases && useCases.length > 0) {
        const useCaseTitle = createElement('dt')
        useCaseTitle.textContent = 'Use cases'
        const useCaseDescription = createElement('dd', undefined, [createElement('ul', 'graphgist-use-cases', useCases.map((useCase) => {
          const useCaseItem = createElement('li')
          // TODO: use slug to create a link!
          useCaseItem.textContent = useCase.name
          return useCaseItem
        }))])
        graphGistInfo.push(useCaseTitle)
        graphGistInfo.push(useCaseDescription)
      }
      // info
      const infoElement = createElement('dl', 'graphgist-info', graphGistInfo)
      const contentElement = createElement('div', 'graphgist-content', [titleElement, infoElement])
      const cardElement = createElement('div', 'graphgist-card', [anchorElement, contentElement])
      liElement.appendChild(cardElement)
      return liElement
    })
  }

  const featuredSectionTitleElement = document.getElementById('featured')
  if (featuredSectionTitleElement) {
    getFeatured().then((featuredResponse) => {
      console.log('featuredResponse', featuredResponse)
      const listElement = createElement('ul', 'graphgists', toGraphGistCardItem(featuredResponse.data.GraphGist))
      const containerElement = createElement('section', 'sectionbody', [listElement])
      featuredSectionTitleElement.parentElement.appendChild(containerElement)
    })
  }

  const industriesSectionTitleElement = document.getElementById('explore-industry')
  if (industriesSectionTitleElement) {
    getIndustries().then((industriesResponse) => {
      const listElement = createElement('ul', 'industries', toListItem(industriesResponse.data.Industry))
      const containerElement = createElement('section', 'sectionbody', [listElement])
      industriesSectionTitleElement.parentElement.appendChild(containerElement)
    })
  }

  const useCasesSectionTitleElement = document.getElementById('explore-use-case')
  if (useCasesSectionTitleElement) {
    getUseCases().then((useCasesResponse) => {
      const listElement = createElement('ul', 'use-cases', toListItem(useCasesResponse.data.UseCase))
      const containerElement = createElement('section', 'sectionbody', [listElement])
      useCasesSectionTitleElement.parentElement.appendChild(containerElement)
    })
  }
})
