#include <iostream>
using namespace std;
#include <iostream>
#include <vector>

using namespace std;

vector<vector<int>>& count(vector<vector<int>>& arr1,vector<vector<int>>& arr2) {
        
        int rows = arr1.size();
        int cols = arr1[0].size();

    vector<vector<int>>ans;
    for (int i = 0; i < rows; i++) {
        vector<int>temp;
        for (int j = 0; j < cols; j++) {
            int sum=arr1[i][j]+arr2[i][j];
            temp.push_back(sum);
        }
        ans.push_back(temp);
    }
    
    return ans;
    }


int main(){
   vector<vector<int>>a1={{1,2,3},
   {4,5,6}};
   vector<vector<int>>a2={{1,2,3},
   {4,5,6}};
   count(a1,a2);
    
 
}