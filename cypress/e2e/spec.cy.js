//Question
const error_question_1 = 'Question 1'
const error_question_2 = 'Question 2'
const error_question_3 = 'Question 3'
const error_question_4 = 'Question 4'
const error_question_5 = 'Question 5'
const error_all_questions = [error_question_1, error_question_2, error_question_3, error_question_4, error_question_5]
const numbers = [0,1,2,3,4]

//Value Question
const validate_question_1 = 'Full name'
const validate_question_2 = 'Phone Number'
const validate_question_3 = 'Do you think your product or service is affordable or expensive?'
const validate_question_4 = 'Rate our services'
const validate_question_5 = 'Review date'
const validate_all_questions = [validate_question_1, validate_question_2, validate_question_3, validate_question_4, validate_question_5]

//Variable
const url = 'https://forms.office.com/pages/responsepage.aspx?id=is2XW8LLaEmfFhLKD9VwE9lpKmxdveNGmMWKETZvAWNUMzhBV1lYTlc1SDNRS00xRVg4OFhPODlQTS4u'
const review_date = 'input[aria-label="Date picker"]'
const button_submit = 'button[data-automation-id="submitButton"]'
const path = 'forms.office.com/pages/'

//Value
const value_name = 'Muhammad Fardilah Syalsabil Firdaus'
const value_phone = '085106039807'
const value_product = 'input[value="Affordable"]'
const value_product_other = 'cheap but good'
const value_rate = 'span[aria-label="4 Star"]'
const value_date = 'button[aria-label="20, February, 2024"]'
const other_answer = 'Ini adalah other answer'

//Function
function makeStringOfLength({min, max}) {

  const length = Math.random() * (max - min + 1) + min
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

  let result = '';

  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }

  return result;
}

const max_length = makeStringOfLength({min: 50, max:75})

describe('validate form', () => {
  it('passes', () => {
    cy.visit(url)
    
    numbers.forEach((number) => {
      cy.get('div[data-automation-id="questionItem"]').eq(number)
    })
    cy.get(button_submit)
  })
})

describe('validate questions', () => {
  it('passes', () => {
    cy.visit(url)

    validate_all_questions.forEach((validate_question) => {
      cy.contains('span', validate_question)
    })
  })
})

describe('validate mandatory all fields', () => {
  it('passes', () => {
    cy.visit(url)

    cy.get(button_submit).click()
    numbers.forEach((number) => {
      cy.get('div[data-automation-id="validationError"]').eq(number).scrollIntoView().should('be.visible')
    })
    
    error_all_questions.forEach((question) => {
      cy.contains('span', question)
    })
  })
})

describe('validate mandatory field Full Name', () => {
  it('passes', () => {
    cy.visit(url)
    cy.get('input[class="-_W-62"]').eq(1).type(value_phone)
    cy.get(value_product).click()
    cy.get(value_rate).click()
    cy.get(review_date).click()
    cy.get(value_date).click()
    cy.get(button_submit).click()
    cy.get('div[class="-sh-47"]').eq(0).scrollIntoView().should('be.visible')
    cy.contains('span', error_question_1)
  })
})

describe('Check validate max length field Full Name', () => {
  it('passes', () => {
    cy.visit(url)
    cy.get('input[class="-_W-62"]').eq(0).type(max_length).invoke('val').should('have.length.lt', 4000)
    cy.get('input[class="-_W-62"]').eq(1).type(value_phone)
    cy.get(value_product).click()
    cy.get(value_rate).click()
    cy.get(review_date).click()
    cy.get(value_date).click()
    cy.get(button_submit).click()
  })
})

describe('validate mandatory field Phone Number', () => {
  it('passes', () => {
    cy.visit(url)
    cy.get('input[class="-_W-62"]').eq(0).type(value_name)
    cy.get(value_product).click()
    cy.get(value_rate).click()
    cy.get(review_date).click()
    cy.get(value_date).click()
    cy.get(button_submit).click()
    cy.get('div[class="-sh-47"]').eq(0).scrollIntoView().should('be.visible')
    cy.contains('span', error_question_2)
  })
})

describe('Check validate max length field Phone Number', () => {
  it('passes', () => {
    cy.visit(url)
    cy.get('input[class="-_W-62"]').eq(0).type(value_phone)
    cy.get('input[class="-_W-62"]').eq(1).type(max_length).invoke('val').should('have.length.lt', 4000)
    cy.get(value_product).click()
    cy.get(value_rate).click()
    cy.get(review_date).click()
    cy.get(value_date).click()
    cy.get(button_submit).click()
  })
})

describe('validate mandatory field Product or Service', () => {
  it('passes', () => {
    cy.visit(url)
    cy.get('input[class="-_W-62"]').eq(0).type(value_name)
    cy.get('input[class="-_W-62"]').eq(1).type(value_phone)
    cy.get(value_rate).click()
    cy.get(review_date).click()
    cy.get(value_date).click()
    cy.get(button_submit).click()
    cy.get('div[class="-sh-47"]').eq(0).scrollIntoView().should('be.visible')
    cy.contains('span', error_question_3)
  })
})

describe('Choose other in field Product or Service', () => {
  it('passes', () => {
    cy.visit(url)
    cy.get('input[class="-_W-62"]').eq(0).type(value_name)
    cy.get('input[class="-_W-62"]').eq(1).type(value_phone)
    cy.get('input[class="-_W-62"]').eq(2).type(other_answer)
    cy.get(value_rate).click()
    cy.get(review_date).click()
    cy.get(value_date).click()
    cy.get(button_submit).click()
  })
})

describe('validate mandatory field Service Rate', () => {
  it('passes', () => {
    cy.visit(url)
    cy.get('input[class="-_W-62"]').eq(0).type(value_name)
    cy.get('input[class="-_W-62"]').eq(1).type(value_phone)
    cy.get(value_product).click()
    cy.get(review_date).click()
    cy.get(value_date).click()
    cy.get(button_submit).click()
    cy.get('div[class="-sh-47"]').eq(0).scrollIntoView().should('be.visible')
    cy.contains('span', error_question_4)
  })
})

describe('validate mandatory field Review Date', () => {
  it('passes', () => {
    cy.visit(url)
    cy.get('input[class="-_W-62"]').eq(0).type(value_name)
    cy.get('input[class="-_W-62"]').eq(1).type(value_phone)
    cy.get(value_product).click()
    cy.get(value_rate).click()
    cy.get(button_submit).click()
    cy.get('div[class="-sh-47"]').eq(0).scrollIntoView().should('be.visible')
    cy.contains('span', error_question_5)
  })
})

describe('validate invalid format date in field Review Date', () => {
  it('passes', () => {
    cy.visit(url)
    cy.get('input[class="-_W-62"]').eq(0).type(value_name)
    cy.get('input[class="-_W-62"]').eq(1).type(value_phone)
    cy.get(value_product).click()
    cy.get(value_rate).click()
    cy.get('input[id="DatePicker0-label"]').dblclick().type('asdasd')
    cy.get('div[class="-eP-115"]').should('be.visible')
  })
})

describe('full submit', () => {
  it('passes', () => {
    cy.visit(url)
    cy.get('input[class="-_W-62"]').eq(0).type(value_name)
    cy.get('input[class="-_W-62"]').eq(1).type(value_phone)
    cy.get(value_product).click()
    cy.get(value_rate).click()
    cy.get(review_date).click()
    cy.get(value_date).click()
    cy.get(button_submit).click()
    cy.contains('Submit another response')
  })
})