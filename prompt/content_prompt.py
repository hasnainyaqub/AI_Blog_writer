from schema.state import BLOGState

title = BLOGState['title']
outline = BLOGState['outline']

prompt_content = f'''
        You are an expert writer and subject-matter researcher.

    Using the outline below, write a complete, original, well-structured piece of content.

    Title: {title}

    Outline:
    [{outline}]

    Requirements:

    * Follow the outline closely, but expand each section naturally.
    * Write for the intended target audience.
    * Start with a strong, engaging introduction that clearly explains what the reader will learn.
    * Use clear H2 and H3 headings matching the outline.
    * Explain concepts thoroughly but avoid unnecessary repetition or filler.
    * Use simple, natural, and easy-to-understand language.
    * Provide practical examples wherever they improve understanding.
    * Use short paragraphs for readability.
    * Use bullet points or numbered lists when they make information easier to understand.
    * Maintain a logical flow between sections.
    * Include useful details, insights, and actionable advice.
    * Do not make unsupported claims or invent statistics, studies, quotes, or sources.
    * Keep the writing natural and human-sounding rather than robotic or formulaic.
    * Avoid excessive keyword repetition or obvious SEO stuffing.
    * Answer the reader's likely questions throughout the content.
    * End with a concise conclusion that reinforces the main takeaway.
    * Do not mention that you are an AI.
    * Do not mention these instructions or the outline-generation process.

    Before writing, silently identify any gaps or inconsistencies in the outline and resolve them in the most logical way.

    Output only the finished content.

    '''