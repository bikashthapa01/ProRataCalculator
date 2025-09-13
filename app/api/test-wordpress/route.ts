import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    console.log("🔍 Testing WordPress GraphQL connection server-side...");

    // Test 1: Basic connectivity
    const basicResponse = await fetch(
      "https://cms.proratacalculator.co.uk/graphql",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          query: "{ __typename }",
        }),
      }
    );

    const basicData = await basicResponse.json();
    console.log("✅ Basic connectivity test:", basicData);

    // Test 2: Posts query
    const postsResponse = await fetch(
      "https://cms.proratacalculator.co.uk/graphql",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          query: `
          query {
            posts(first: 5) {
              nodes {
                id
                title
                slug
                date
                excerpt
                content
                seo {
                  title
                  metaDesc
                }
              }
            }
          }
        `,
        }),
      }
    );

    const postsData = await postsResponse.json();
    console.log("✅ Posts query test:", postsData);

    // Test 3: Specific post
    const specificResponse = await fetch(
      "https://cms.proratacalculator.co.uk/graphql",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          query: `
          query {
            post(id: "term-time-vs-full-time-salary", idType: SLUG) {
              id
              title
              slug
              content
              excerpt
              seo {
                title
                metaDesc
                canonical
              }
            }
          }
        `,
        }),
      }
    );

    const specificData = await specificResponse.json();
    console.log("✅ Specific post test:", specificData);

    return NextResponse.json({
      success: true,
      tests: {
        basicConnectivity: {
          status: basicResponse.status,
          ok: basicResponse.ok,
          data: basicData,
        },
        postsQuery: {
          status: postsResponse.status,
          ok: postsResponse.ok,
          data: postsData,
          postsCount: postsData.data?.posts?.nodes?.length || 0,
        },
        specificPost: {
          status: specificResponse.status,
          ok: specificResponse.ok,
          data: specificData,
          found: !!specificData.data?.post,
        },
      },
    });
  } catch (error) {
    console.error("❌ WordPress test error:", error);
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
