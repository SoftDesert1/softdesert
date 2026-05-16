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
    } = body;

    await supabase

      .from(
        "post_suggestions"
      )

      .update({

        status:
          "rejected",

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