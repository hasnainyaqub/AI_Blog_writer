from schema.state import BLOGState
title = BLOGState['title']

prompt_outline = (f'''
    You are an expert content strategist and writer.

    I will give you a title/topic. Create a clear, logical, and comprehensive outline for the content.

    Title: {title}

    Requirements:

    * Identify the main purpose and search intent behind the title.
    * Define the target audience based on the topic.
    * Create a logical structure that flows naturally from introduction to conclusion.
    * Include an engaging introduction section.
    * Break the main topic into relevant H2 sections.
    * Add useful H3 subsections under H2s where appropriate.
    * Cover important questions, concepts, examples, benefits, drawbacks, practical tips, and related points when relevant.
    * Avoid unnecessary or repetitive sections.
    * Make the outline comprehensive enough to support a detailed, high-quality article.
    * Arrange sections in the order that makes the most sense for the reader.
    * Include a brief description of what should be covered in each section.
    * If the topic is suitable for SEO, naturally include relevant subtopics and related search queries without keyword stuffing.

    Output format:

    # [Title]

    ## Introduction

    * What the introduction should cover

    ## H2: [Main Section]

    * Key points to discuss
    * Important details/examples

    ### H3: [Subsection]

    * Key points to discuss

    ## H2: [Main Section]

    * Key points to discuss

    ## Conclusionz

    * What the conclusion should summarize
    * Final takeaway or recommendation

    Do not write the full article. Only provide the outline.
    Important rule: 
        result will be less then 1000 tokens.
        

    ''')