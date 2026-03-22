import spacy

nlp = spacy.load("pt_core_news_sm")

def preprocess_text(text: str) -> dict:
    normalized_text = " ".join(text.split()).strip()
    doc = nlp(normalized_text)

    keywords: list[str] = []

    for token in doc:
        if token.is_stop:
            continue
        if token.is_punct or token.is_space:
            continue

        lemma = token.lemma_.strip().lower()
        
        if len(lemma) < 3:
            continue

        keywords.append(lemma)

    unique_keywords = list(dict.fromkeys(keywords))[:12]

    return {
        "clean_text": normalized_text,
        "keywords": unique_keywords
    }