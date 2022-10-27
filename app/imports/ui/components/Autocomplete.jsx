import React, { useEffect, useState } from 'react';
import { InputGroup } from 'react-bootstrap';
import { Typeahead } from 'react-bootstrap-typeahead';
import _ from 'lodash';
import PropTypes from 'prop-types';

const Autocomplete = ({ billData, onDataFiltering }) => {
  const [search, setSearch] = useState([]);
  const [ogData, setOgData] = useState([]);
  useEffect(() => {
    setOgData(billData);
  }, []);

  useEffect(() => {
    const filteredData = ogData;
    // eslint-disable-next-line no-unused-expressions
    if (search.length > 0) {
      onDataFiltering(filteredData.filter((d) => (_.isEqual(d, search[0]))));
    } else {
      onDataFiltering([...ogData]);
    }
  }, [search]);

  return (
    <InputGroup className="mb-3">
      <Typeahead
        id="basic-example"
        className="w-100"
        paginate
        onChange={setSearch}
        labelKey="bill_name"
        filterBy={['bill_name', 'bill_number']}
        options={ogData}
        placeholder="Enter a bill name or bill number"
        selected={search}
        renderMenuItemChildren={(option) => (
          <div>
            <div>{option.bill_name} <strong>#{option.bill_number}</strong></div>
          </div>
        )}
      />
    </InputGroup>
  );
};

Autocomplete.propTypes = {
  onDataFiltering: PropTypes.func.isRequired,
  billData: PropTypes.arrayOf(PropTypes.shape({
    _id: PropTypes.string,
    bill_name: PropTypes.string,
    bill_status: PropTypes.string,
    bill_hearing: PropTypes.string,
    bill_number: PropTypes.number,
    bill_updated: PropTypes.number,
    bill_committee: PropTypes.string,
    measureTypes: PropTypes.string,
    office: PropTypes.string,
  })).isRequired,
};

export default Autocomplete;
