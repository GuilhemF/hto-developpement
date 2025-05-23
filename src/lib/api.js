export async function navQuery() {
  const siteNavQueryRes = await fetch(import.meta.env.WORDPRESS_API_URL, {
    method: "post",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      query: `{
                menus(where: {location: PRIMARY}) {
                  nodes {
                    name
                    menuItems {
                        nodes {
                            uri
                            url
                            order
                            label
                        }
                    }
                  }
                }
                generalSettings {
                    title
                    url
                    description
                }
            }
            `,
    }),
  });
  const { data } = await siteNavQueryRes.json();
  return data;
}

export async function getGlobalACF() {
  const res = await fetch(import.meta.env.WORDPRESS_API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      query: `
        query {
          contenusGlobaux {
            globalInfos {
              telephone
              adresse
            }
          }
        }
      `,
    }),
  });

  if (!res.ok) {
    console.error("[getGlobalACF] Fetch failed:", res.status, res.statusText);
  }

  const text = await res.text();
  console.log("[getGlobalACF] Raw response:", text);

  let json;
  try {
    json = JSON.parse(text);
  } catch (e) {
    console.error("[getGlobalACF] JSON parse error:", e);
    return {};
  }

  const { data } = json;
  return data.contenusGlobaux?.globalInfos ?? {};
}

export async function getFooterMenu() {
  const query = `
    query {
      menus(where: {location: FOOTER}) {
        nodes {
          name
          menuItems {
            nodes {
              label
              uri
              url
            }
          }
        }
      }
    }
  `;

  const res = await fetch(import.meta.env.WORDPRESS_API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ query }),
  });

  const { data } = await res.json();
  return data.menus?.nodes[0]?.menuItems?.nodes ?? [];
}

export async function homePagePostsQuery() {
  const response = await fetch(import.meta.env.WORDPRESS_API_URL, {
    method: "post",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      query: `{
                posts {
                  nodes {
                    date
                    uri
                    title
                    commentCount
                    excerpt
                    categories {
                      nodes {
                        name
                        uri
                      }
                    }
                    featuredImage {
                      node {
                        srcSet
                        sourceUrl
                        altText
                        mediaDetails {
                          height
                          width
                        }
                      }
                    }
                  }
                }
              }
            `,
    }),
  });
  const { data } = await response.json();
  return data;
}

export async function getNodeByURI(uri) {
  const response = await fetch(import.meta.env.WORDPRESS_API_URL, {
    method: "post",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      query: `query GetNodeByURI($uri: String!) {
                nodeByUri(uri: $uri) {
                  __typename
                  isContentNode
                  isTermNode
                  ... on Post {
                    id
                    databaseId
                    title
                    date
                    uri
                    excerpt
                    content
                    categories {
                      nodes {
                        name
                        uri
                      }
                    }
                    featuredImage {
                      node {
                        srcSet
                        sourceUrl
                        altText
                        mediaDetails {
                          height
                          width
                        }
                      }
                    }
                  }
                  ... on Page {
                    id
                    databaseId
                    title
                    uri
                    date
                    content
                    template {
                      templateName
                    }
                    featuredImage {
                      node {
                        srcSet
                        sourceUrl
                        altText
                        mediaDetails {
                          height
                          width
                        }
                      }
                    }
                  }
                  ... on Category {
                    id
                    databaseId
                    name
                    posts {
                      nodes {
                        date
                        title
                        excerpt
                        uri
                        categories {
                          nodes {
                            name
                            uri
                          }
                        }
                        featuredImage {
                          node {
                            srcSet
                            sourceUrl
                            altText
                            mediaDetails {
                              height
                              width
                            }
                          }
                        }
                      }
                    }
                  }
                }
              }
            `,
      variables: {
        uri: uri,
      },
    }),
  });
  const { data } = await response.json();
  return data;
}

export async function getAllUris() {
  const response = await fetch(import.meta.env.WORDPRESS_API_URL, {
    method: "post",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      query: `query GetAllUris {
            terms {
              nodes {
                uri
              }
            }
            posts(first: 100) {
              nodes {
                uri
              }
            }
            pages(first: 100) {
              nodes {
                uri
              }
            }
          }
          `,
    }),
  });
  const { data } = await response.json();
  const uris = Object.values(data)
    .reduce(function (acc, currentValue) {
      return acc.concat(currentValue.nodes);
    }, [])
    .filter((node) => node.uri !== null)
    .map((node) => {
      let trimmedURI = node.uri.substring(1);
      trimmedURI = trimmedURI.substring(0, trimmedURI.length - 1);
      return {
        params: {
          uri: trimmedURI,
        },
      };
    });

  return uris;
}
