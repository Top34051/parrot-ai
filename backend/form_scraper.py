from bs4 import BeautifulSoup
import requests


def extract_form(url: str):

    # get html content of the webpage
    webpage = requests.get(url)
    content = webpage.content

    # initialize bs for webpage
    soup = BeautifulSoup(content, "html.parser")

    form_title = soup.find('meta', {'property': 'og:title'})
    if form_title:
        form_title = form_title['content']
    else:
        form_title = ''

    form_description = soup.find('meta', {'property': 'og:description'})
    if form_description:
        form_description = form_description['content']
    else:
        form_description = ''

    # extract html list item
    form_items = []

    items = soup.find_all("div", {"role": "list"})[0]
    for item in items:

        item_content = str(item)
        item_soup = BeautifulSoup(str(item_content), "html.parser")

        title = item_soup.find('div', {'role': 'heading'}).text

        required = '*' in title

        description = item_soup.find('div', {'role': 'heading'}).find_next('div').contents
        description_res = []
        for tag in description:
            tag = str(tag).strip()
            if tag.startswith('<a'):
                bs = BeautifulSoup(str(tag), 'html.parser')
                tag = bs.text
            elif tag == '<br/>':
                tag = '\n'
            description_res.append(tag)
        description = ' '.join([str(s) for s in description_res])

        type = 'title-and-description'

        if item_soup.find('input'):
            type = 'short-answer'

        options = []

        radio_soup = item_soup.find('div', {'role': 'listitem'}).find_all_next('div', {'role': 'radio'})
        if radio_soup:
            type = 'multiple-choice'
            options = [option['aria-label'] for option in radio_soup]

        checkboxes_soup = item_soup.find('div', {'role': 'listitem'}).find_all_next('div', {'role': 'checkbox'})
        if checkboxes_soup:
            type = 'checkboxes'
            options = [option['aria-label'] for option in checkboxes_soup]

        options_soup = item_soup.find('div', {'role': 'listitem'}).find_all_next('div', {'role': 'option'})
        if options_soup:
            type = 'dropdown'
            options = [option['data-value'] for option in options_soup if option['tabindex'] == '-1']

        form_items.append({
            'type': type,
            'data': {
                'text': {
                    'title': title,
                    'description': description,
                    'options': options
                }
            },
            'required': required
        })

    return {
        'title': form_title,
        'description': form_description,
        'form_items': form_items
    }
