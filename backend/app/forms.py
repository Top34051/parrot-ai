from bs4 import BeautifulSoup
import requests

from pprint import pprint


def extract_texts(s):
    words = []
    word = ''
    skip = False
    for c in s:
        if c == '<':
            skip = True
            if word != '':
                words.append(word)
                word = ''
        elif c == '>':
            skip = False
        elif not skip:
            word += c
    if word != '':
        words.append(word)
    return words


def contains_div(s, tag):
    idx = s.find('>')
    s = s[idx + 1:]
    return tag in s


def extract_items(url: str):

    # get html content of the webpage
    webpage = requests.get(url)
    content = webpage.content

    # initialize bs for webpage
    soup = BeautifulSoup(webpage.content, "html.parser")

    # extract html list items
    items = soup.find_all("div", {"role": "listitem"})

    item_dicts = []
    for item in items:

        # extract texts from div
        item_str = str(item)
        words = extract_texts(item_str)

        # classify item
        if words[-1] == 'Your answer':
            words = words[:-1]
            item_type = 'short-response'
        elif contains_div(item_str, 'radiogroup'):
            item_type = 'radio_group'
        elif contains_div(item_str, 'checkbox') and contains_div(item_str, 'listitem'):
            item_type = 'checkbox'
        elif contains_div(item_str, 'checkbox') and not contains_div(item_str, 'listitem'):
            item_type = None
        else:
            item_type = 'text'

        # invalid item
        if item_type == None:
            continue

        pos = -1
        if ' *' in words:
            pos = words.index(' *')

        # generate item dict
        if item_type == 'text':
            item_dict = {
                'type': item_type,
                'is_required': False,
                'text': ' '.join(words),
                'options': []
            }
        elif pos == -1:
            item_dict = {
                'type': item_type,
                'is_required': False,
                'text': words[0],
                'options': words[1:]
            }
        else:
            item_dict = {
                'type': item_type,
                'is_required': True,
                'text': ' '.join(words[:pos]),
                'options': words[pos+1:]
            }
        
        item_dicts.append(item_dict)

    return item_dicts


if __name__ == '__main__':

    url = "https://docs.google.com/forms/d/e/1FAIpQLSdWL_sXWM6kvr1uK1Er_1PjJ-HiWS_6mnhADIfvaEVqNy2kYg/viewform"
    items = extract_items(url)

    pprint(items)