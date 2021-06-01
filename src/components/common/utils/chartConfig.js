import zipcelx from 'zipcelx'

// Chart Sizes

const smallSize = 600
const mediumSize = 800
const largeSize = 1300

// Custom xlsx Library Export
const xlsxCustomExport = (categoryName, seriesArray, chartTitle, noCategory) => {
    const series = [{value: categoryName, type: typeof categoryName}];
    const auxSeries = seriesArray;
    const auxCategory = [];

    if (!noCategory) {
        auxSeries.map((element) => {
            series.push({value: element.name, type: typeof element.name})
        });

        auxSeries.forEach((element) => {
            // When there's more than one serie, creates first array then after that it adds to the same category
            if (auxCategory == [] || auxCategory.length == 0) {
                element.data.map((row) => {
                    auxCategory.push([{type: typeof row.category, value: row.category}, {type: typeof row.y, value: row.y}]);
                })
            } else {
                // after creation of first array / so it adds to the same category.
                element.data.map((row) => {
                    const index = auxCategory.findIndex((element) => {return element.find((inner) => inner.value == row.category)});
                    auxCategory[index].push({type: typeof row.y, value: row.y })
                })
            }
        });
    } else {
        series.push({ value: 'value', type: 'string' });
        
        auxSeries.map((element) => {
            element.data.map((row) => {
                auxCategory.push([{ type: typeof row.options.name, value: row.options.name }, { type: typeof row.options.y, value: row.options.y }])
            })
        })
    }

    const config = {
        filename: chartTitle.replace(/<\/?[a-z][a-z0-9]*[^<>]*>|<!--.*?-->/img, '').replace(/ /g, '_').toLowerCase(),
        sheet: {
            data: [
                series,
                ...auxCategory
            ]
        }
    }
    zipcelx(config)
}

export { smallSize, mediumSize, largeSize, xlsxCustomExport }