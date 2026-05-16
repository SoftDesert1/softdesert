import { NextResponse }
      return NextResponse.json(
        {
          error: "Sugestão não encontrada",
        },
        {
          status: 404,
        }
      );
    }

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

        slug:
          suggestion.title
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, "-")
            .replace(/(^-|-$)/g, ""),

        created_by:
          adminName,

        suggested_by:
          suggestion.user_name,
      });

    await supabase

      .from("post_suggestions")

      .update({
        status: "approved",
      })

      .eq("id", suggestionId);

    return NextResponse.json({
      success: true,
    });

  } catch {

    return NextResponse.json(
      {
        error: "Erro interno",
      },
      {
        status: 500,
      }
    );
  }
}