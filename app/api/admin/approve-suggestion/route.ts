import { NextResponse }
from "next/server";

import { createClient }
from "@supabase/supabase-js";

const supabase =
  createClient(

    process.env
      .NEXT_PUBLIC_SUPABASE_URL!,

    process.env
      .SUPABASE_SERVICE_ROLE_KEY!
  );

export async function POST(
  req: Request
) {

  try {

    const body =
      await req.json();

    const {
      suggestionId,
      adminName,
    } = body;

    const {
      data: suggestion,
      error,
    } =
      await supabase

        .from(
          "post_suggestions"
        )

        .select("*")

        .eq(
          "id",
          suggestionId
        )

        .single();

    if (
      error ||
      !suggestion
    ) {

      return NextResponse.json(

        {
          error:
            "Sugestão não encontrada",
        },

        {
          status: 404,
        }
      );
    }

    const slug =
      suggestion.title

        .toLowerCase()

        .replace(
          /[^a-z0-9]+/g,
          "-"
        )

        .replace(
          /(^-|-$)/g,
          ""
        );

    await supabase

      .from("posts")

      .insert({

        title:
          suggestion.title,

        content:
          suggestion.description,

        image:
          suggestion.image,

        category:
          suggestion.category,

        slug,

        created_by:
          adminName,

        suggested_by:
          suggestion.user_name,

      });

    await supabase

      .from(
        "post_suggestions"
      )

      .update({

        status:
          "approved",

      })

      .eq(
        "id",
        suggestionId
      );

    return NextResponse.json({

      success: true,

    });

  } catch {

    return NextResponse.json(

      {
        error:
          "Erro interno",
      },

      {
        status: 500,
      }
    );
  }
}