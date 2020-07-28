import React, { useState } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { FiChevronsLeft, FiChevronRight, FiChevronsRight, FiChevronLeft } from 'react-icons/fi'

const PaginationItem = styled.button.attrs(({ active }) => ({
  className: active ? 'active' : ''
}))`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 40px;
  background-color: #fff;
  border-color:#fff;
  padding: 10px 15px;
  color: #000;
  text-align: center;
  border-top: #d3d3d3;
  border-bottom: #d3d3d3;
  border-right: #d3d3d3;
  cursor: pointer;
  &:first-child {
    border-bottom-left-radius: 4px;
    border-top-left-radius: 4px;
    border-left: #d3d3d3;
  }
  &:last-child {
    border-bottom-right-radius: 4px;
    border-top-right-radius: 4px;
  }
  &.active,
  &:hover {
    color: #fff;
    background-color: #3498db;
    border-color: #3498db;
  }

  &:disabled {
    color: #939393;
    background-color: #d3d3d3;
    border: none;
    cursor: not-allowed;
  }
`
const Grid = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
`

const FlexComponent = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  padding: 10px 0;
`

const showPaginationItems = (totalPages, currentPageNumber, setCurrentPageNumber) => {
  return (
    <React.Fragment>
      <PaginationItem disabled={currentPageNumber <= 1} onClick={() => setCurrentPageNumber(1)}>
        <FiChevronsLeft />
      </PaginationItem>
      <PaginationItem
        disabled={currentPageNumber <= 1}
        onClick={() => setCurrentPageNumber(currentPageNumber - 1)}
      >
        <FiChevronLeft />
      </PaginationItem>
      {currentPageNumber !== 1 ? (
        <PaginationItem onClick={() => setCurrentPageNumber(currentPageNumber - 1)}>
          {currentPageNumber - 1}
        </PaginationItem>
      ) : null}
      <PaginationItem active>{currentPageNumber}</PaginationItem>
      {currentPageNumber < totalPages ? (
        <PaginationItem onClick={() => setCurrentPageNumber(currentPageNumber + 1)}>
          {currentPageNumber + 1}
        </PaginationItem>
      ) : null}
      <PaginationItem
        disabled={currentPageNumber >= totalPages}
        onClick={() => setCurrentPageNumber(currentPageNumber + 1)}
      >
        <FiChevronRight />
      </PaginationItem>
      <PaginationItem
        disabled={currentPageNumber >= totalPages}
        onClick={() => setCurrentPageNumber(totalPages)}
      >
        <FiChevronsRight />
      </PaginationItem>
    </React.Fragment>
  )
}

const ChildrenWrapper = styled.div`
  padding: 10px 0;
`

const Pagination = ({ children, itemsPerPage, arrayItems }) => {
  const [currentPageNumber, setCurrentPageNumber] = useState(1)
  const [totalPages] = useState(Math.ceil((arrayItems || children.length) / itemsPerPage))

  const paginate = (items, currentPage) => {
    if (items.length > 1) {
      const start = (currentPage - 1) * itemsPerPage
      const end = start + itemsPerPage

      return items.slice(start, end)
    } else return items
  }

  return (
    <Grid>
      <FlexComponent>
        {showPaginationItems(totalPages, currentPageNumber, setCurrentPageNumber)}
      </FlexComponent>
      <ChildrenWrapper>{paginate(children, currentPageNumber)}</ChildrenWrapper>
      <FlexComponent>
        {showPaginationItems(totalPages, currentPageNumber, setCurrentPageNumber)}
      </FlexComponent>
    </Grid>
  )
}

Pagination.defaultProps = {
  itemsPerPage: 10
}

Pagination.propTypes = {
  itemsPerPage: PropTypes.number,
  children: PropTypes.any,
  arrayItems: PropTypes.number
}

export default Pagination
