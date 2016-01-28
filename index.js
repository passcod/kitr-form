'use strict'
import React, { Component, PropTypes } from 'react'
import { ChildrenType, FalsyType } from 'kitr-helpers'
import { upperFirst } from 'lodash'
import classNames from 'classnames'

export default class Form extends Component {
  constructor () {
    super()
    this.state = {
      error: false,
      loading: false
    }
  }

  static get propTypes () {
    return {
      children: ChildrenType,
      className: PropTypes.string,
      onSubmit: PropTypes.func,
      simpleSubmit: PropTypes.oneOfType([FalsyType, PropTypes.string])
    }
  }

  static get defaultProps () {
    return {
      submit: 'Submit'
    }
  }

  error (err) {
    this.setState({
      error: err,
      loading: false
    })
  }

  reset () {
    this.refs.form.reset()
  }

  success () {
    this.reset()
    this.setState({
      error: false,
      loading: false
    })
  }

  onSubmit (e) {
    e.preventDefault()
    this.setState({
      error: false,
      loading: true
    })

    if (typeof this.props.onSubmit === 'function') {
      return this.props.onSubmit(e)
    }
  }

  render () {
    const onSubmit = this.onSubmit.bind(this)
    return (
      <form className={this.props.className} onSubmit={onSubmit} ref='form'>
        <Error err={this.state.error} />
        {this.props.children}
        {this.props.simpleSubmit ? (
          <ButtonRow>
            <Submit
              loading={this.state.loading}
              text={this.props.simpleSubmit} />
          </ButtonRow>
        ) : null}
      </form>
    )
  }
}

/* eslint-disable react/prop-types */
export function ButtonRow (props) {
  return <div className='button-row'>{props.children}</div>
}

export function InputRow (props) {
  return <div className='input-row'>{props.children}</div>
}

export function InputGroup (props) {
  return <div className='input-group'>{props.children}</div>
}

export function Submit (props) {
  const c = classNames({ loading: props.loading }, props.className)
  return <input
    type='submit'
    className={c}
    value={props.loading ? 'Loading...' : props.text}
    disabled={props.loading} />
}

export function Error (props) {
  const err = props.err
  return err ? (
    <div className='message'>
      {upperFirst(err.message)}
    </div>
  ) : <noscript />
}
/* eslint-enable react/prop-types */
